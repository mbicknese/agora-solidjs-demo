import { render, screen, waitFor } from "@solidjs/testing-library";
import { expect, it, vi } from "vitest";
import type { ICameraVideoTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import PlayerCanvas from "./player-canvas";

const MOCK_VIDEO = vi.mocked({ play: vi.fn() } as unknown as ICameraVideoTrack);
const MOCK_AUDIO = vi.mocked({ play: vi.fn() } as unknown as IRemoteAudioTrack);

it("shows connecting when not connected", () => {
  render(() => <PlayerCanvas video={MOCK_VIDEO} />);
  expect(screen.getByText("Connecting ...")).toBeInTheDocument();
});

it("calls play on the audio and video streams", async () => {
  MOCK_AUDIO.play.mockReset();
  MOCK_VIDEO.play.mockReset();
  render(() => <PlayerCanvas video={MOCK_VIDEO} audio={MOCK_AUDIO} />);

  await waitFor(() => {
    expect(MOCK_AUDIO.play).toHaveBeenCalledOnce();
    expect(MOCK_VIDEO.play).toHaveBeenCalledOnce();
  });
});
