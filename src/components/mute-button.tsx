import type {
  IMicrophoneAudioTrack,
  IRemoteAudioTrack,
} from "agora-rtc-sdk-ng";
import { createSignal, Match, Show, Switch } from "solid-js";

type Props = {
  audio: IMicrophoneAudioTrack | IRemoteAudioTrack;
};
export default function MuteButton(props: Props) {
  /** @ts-expect-error */
  const [muted, setMuted] = createSignal(props.audio.muted);

  const handleMute = async () => {
    if ("setMuted" in props.audio) {
      await props.audio.setMuted(!props.audio.muted);
      setMuted(props.audio.muted);
    }
  };

  return (
    <Show when={"setMuted" in props.audio}>
      <button type="button" onClick={handleMute}>
        <Switch>
          <Match when={muted()}>Unmute</Match>
          <Match when={!muted()}>Mute</Match>
        </Switch>
      </button>
    </Show>
  );
}
