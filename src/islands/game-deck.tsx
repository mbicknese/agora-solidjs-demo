"use client";
import AgoraRTC, {
  type IAgoraRTCRemoteUser,
  type ICameraVideoTrack,
  type IRemoteVideoTrack,
} from "agora-rtc-sdk-ng";
import { For } from "solid-js";
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

  client.on("user-published", async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    setUsers(`${user.uid}`, user);
  });

  (async () => {
    const uid = await client.join(
      import.meta.env.VITE_AGORA_APPID,
      "test",
      null,
    );
    const videoTrack = await AgoraRTC.createCameraVideoTrack({});
    setUsers(`${uid}`, { uid: `${uid}`, videoTrack });
    await client.publish([videoTrack]);
  })();

  return (
    <article>
      <h2>Game deck</h2>
      <For each={Object.values(users).filter(hasVideoTrack)}>
        {(user) => <PlayerCanvas video={user.videoTrack} />}
      </For>
    </article>
  );
}
