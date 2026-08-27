import { baseApi } from "./base";

export async function getVideos(options: { signal: AbortSignal }) {
  const res = await baseApi.get("videos", options);
  return res;
}
