import type { VideoInput } from "../types/video";
import { baseApi } from "./base";

export async function getVideos(options: { signal: AbortSignal }) {
  const res = await baseApi.get("videos", options);
  return res;
}

export async function createVideo(videoInput: VideoInput, options: { signal: AbortSignal }) {
  const res = await baseApi.post("videos", videoInput, options);
  return res;
}
