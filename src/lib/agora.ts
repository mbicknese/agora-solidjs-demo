import AgoraRTC from "agora-rtc-sdk-ng";

export const client = AgoraRTC.createClient({ mode: "rtc", codec: "av1" });
