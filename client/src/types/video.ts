export type VideoInput = { url: string; title: string };

export type Video = VideoInput & {
  _id: string;
  user: string;
};
