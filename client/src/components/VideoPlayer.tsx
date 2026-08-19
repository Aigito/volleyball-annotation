import { useRef, useState, type Dispatch, type SetStateAction } from "react";

type VideoPlayerProp = {
  setTimestamp: Dispatch<SetStateAction<number>>;
};

export default function VideoPlayer({ setTimestamp }: VideoPlayerProp) {
  const [, setVideoDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const onTimeUpdate = () => {
    const nextTime = videoRef?.current?.currentTime ?? 0;

    setTimestamp(Math.floor(nextTime));
  };

  const onLoadedMetaData = () => {
    const duration = videoRef?.current?.duration ?? 0;

    setVideoDuration(Math.floor(duration));
  };

  const handlePlayback = async () => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    if (videoElement.paused) {
      try {
        await videoElement.play();
      } catch (err) {
        if (err instanceof Error) {
          console.error("Unable to play video", err.message);
        } else {
          console.error("Unknown error");
        }
      }
    } else {
      videoElement.pause();
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetaData}
        width="640"
        height="360"
        controls
        muted
      >
        <source src="../../test/test.MP4" />
      </video>
      <button onClick={handlePlayback}>Play/Pause</button>
    </div>
  );
}
