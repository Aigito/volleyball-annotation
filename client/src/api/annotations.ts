import type { Annotation } from "../types/annotation";
import { baseApi } from "./base";

export const getAnnotations = async (options: { signal: AbortSignal }) => {
  const res = await baseApi.get("annotations", options);
  return res;
};

export const createAnnotation = async (data: Annotation, options: { signal: AbortSignal }) => {
  const res = await baseApi.post("annotations", data, options);
  return res;
};
