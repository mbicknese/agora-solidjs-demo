"use client";
import "./player-canvas.css";
import type {
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  IRemoteAudioTrack,
  IRemoteVideoTrack,
} from "agora-rtc-sdk-ng";
import { createSignal, Show } from "solid-js";
import MuteButton from "~/components/mute-button";

type Props = {
  audio?: IRemoteAudioTrack | IMicrophoneAudioTrack;
  video: ICameraVideoTrack | IRemoteVideoTrack;
};
export default function PlayerCanvas(props: Props) {
  const [connecting, setConnecting] = createSignal(true);
  const videoAnchor = <div class="video-wrapper"></div>;

  // Seeing the Agora library wants to manipulate the DOM by itself, its best not to let it know we're controlling
  // the DOM as well. By waiting one tick, we ensure the element is rendered and placed in the hierarchy.
  queueMicrotask(() => {
    setConnecting(false);
    props.video.play(videoAnchor as HTMLElement);
    // When 'setDevice' is in the audio stream, it's the local stream and we don't want to feedback to our local client
    if (props.audio != null && !("setDevice" in props.audio)) {
      props.audio.play();
    }
  });
  return (
    <div class="player-canvas">
      <Show when={connecting()}>
        <p>Connecting ...</p>
      </Show>
      {videoAnchor}
      <Show when={props.audio}>{(a) => <MuteButton audio={a()} />}</Show>
    </div>
  );
}
