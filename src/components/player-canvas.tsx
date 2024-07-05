"use client";
import "./player-canvas.css";
import type { ICameraVideoTrack, IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import { createSignal, Show } from "solid-js";

type Props = {
  video: ICameraVideoTrack | IRemoteVideoTrack;
};
export default function PlayerCanvas({ video }: Props) {
  const [connecting, setConnecting] = createSignal(true);
  const videoAnchor = <div class="video-wrapper"></div>;

  // Seeing the Agora library wants to manipulate the DOM by itself, its best not to let it know we're controlling
  // the DOM as well. By waiting one tick, we ensure the element is rendered and placed in the hierarchy.
  queueMicrotask(() => {
    setConnecting(false);
    video.play(videoAnchor as HTMLElement);
  });
  return (
    <div class="player-canvas">
      <Show when={connecting()}>
        <p>Connecting ...</p>
      </Show>
      {videoAnchor}
    </div>
  );
}
