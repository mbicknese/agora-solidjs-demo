import { render, screen } from "@solidjs/testing-library";
import type { IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import { expect, it, vi } from "vitest";
import UserEvent from "@testing-library/user-event";
import MuteButton from "./mute-button";

it("keeps track of mute state", async () => {
  const audio = vi.mocked({
    muted: false,
    setMuted: vi.fn(),
  } as unknown as IMicrophoneAudioTrack);
  audio.setMuted.mockImplementation(() => {
    audio.muted = true;
    return Promise.resolve();
  });

  render(() => <MuteButton audio={audio} />);
  await UserEvent.click(screen.getByRole("button", { name: "Mute" }));

  expect(audio.setMuted).toHaveBeenCalledWith(true);
  expect(screen.getByRole("button", { name: "Unmute" })).toBeInTheDocument();
});
