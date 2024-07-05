"use client";
import AgoraRTC, {
  type ICameraVideoTrack,
  type IRemoteVideoTrack,
} from "agora-rtc-sdk-ng";
import { For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import PlayerCanvas from "~/components/player-canvas";
import { client } from "~/lib/agora";

type Player = {
  uid: string | number;
  videoTrack?: ICameraVideoTrack | IRemoteVideoTrack;
};
const hasVideoTrack = <T extends Pick<Player, "videoTrack">>(
  player: T,
): player is T & Required<Pick<T, "videoTrack">> => {
  return player.videoTrack != null;
};

export default function GameDeck() {
  const [users, setUsers] = createStore<Record<string, Player>>({});

  const uidPromise = client.join(
    import.meta.env.VITE_AGORA_APPID,
    "test",
    null,
  );

  client.on("user-published", async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    setUsers(`${user.uid}`, user);
  });

  const join = async () => {
    const uid = await uidPromise;
    const videoTrack = await AgoraRTC.createCameraVideoTrack({});
    setUsers(`${uid}`, { uid: `${uid}`, videoTrack });
    await client.publish([videoTrack]);
  };

  return (
    <article>
      <h2>Game deck</h2>
      <For each={Object.values(users).filter(hasVideoTrack)}>
        {(user) => <PlayerCanvas video={user.videoTrack} />}
      </For>
      {/* max 4 players instead of 2 */}
      <Show when={Object.keys(users).length < 5}>
        <button type="button" onClick={join}>
          Take a seat
        </button>
      </Show>
    </article>
  );
}
