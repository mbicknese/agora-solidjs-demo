"use client";
import AgoraRTC, {
  type ICameraVideoTrack,
  type IRemoteAudioTrack,
  type IRemoteVideoTrack,
} from "agora-rtc-sdk-ng";
import { createSignal, For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import PlayerCanvas from "~/components/player-canvas";
import { client } from "~/lib/agora";
import "./game-deck.css";

type Player = {
  uid: string | number;
  videoTrack?: ICameraVideoTrack | IRemoteVideoTrack;
  audioTrack?: IRemoteAudioTrack;
};
const hasVideoTrack = <T extends Pick<Player, "videoTrack">>(
  player: T,
): player is T & Required<Pick<T, "videoTrack">> => {
  return player.videoTrack != null;
};

type Props = {
  game: string;
};
export default function GameDeck({ game }: Props) {
  const [users, setUsers] = createStore<Record<string, Player>>({});
  const [isHost, setIsHost] = createSignal(false);

  const uidPromise = client.join(import.meta.env.VITE_AGORA_APPID, game, null);

  client.on("user-published", async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    setUsers(`${user.uid}`, user);
  });

  const join = async () => {
    const uid = await uidPromise;
    const [videoTrack, audioTrack] = await Promise.all([
      AgoraRTC.createCameraVideoTrack(),
      AgoraRTC.createMicrophoneAudioTrack(),
    ]);
    setUsers(`${uid}`, { uid: `${uid}`, videoTrack });
    setIsHost(true);
    await client.publish([videoTrack, audioTrack]);
  };

  return (
    <article class="game-deck">
      <h2>
        Game: <span>{game}</span>
      </h2>
      <img src="/static-map.webp" alt="map of the game world" />
      <For each={Object.values(users).filter(hasVideoTrack)}>
        {(user) => (
          <PlayerCanvas video={user.videoTrack} audio={user.audioTrack} />
        )}
      </For>
      {/* max 4 players instead of 2 */}
      <Show when={Object.keys(users).length < 5 && !isHost()}>
        <button type="button" onClick={join}>
          Take a seat
        </button>
      </Show>
      <p>Currently online: {Object.keys(users).length}</p>
    </article>
  );
}
