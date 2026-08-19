import { useRef, useState, type Dispatch, type SetStateAction } from "react";

type Time = {
  minute: number;
  second: number;
};

type VideoPlayerProp = {
  currentTime: Time;
  setCurrentTime: Dispatch<SetStateAction<{ minute: number; second: number }>>;
};

// TODO: Change so that timestamp is always a number, and is only formatted for UI purposes

export default function VideoPlayer({ currentTime, setCurrentTime }: VideoPlayerProp) {
  const [videoDuration, setVideoDuration] = useState({ minute: 0, second: 0 });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const onTimeUpdate = () => {
    const nextTime = videoRef?.current?.currentTime ?? 0;
    const [minute, second] = formatMinuteAndSecond(nextTime);

    setCurrentTime({ minute, second });
  };

  const onLoadedMetaData = () => {
    const duration = videoRef?.current?.duration ?? 0;
    const [minute, second] = formatMinuteAndSecond(duration);

    setVideoDuration({ minute, second });
  };

  const formatMinuteAndSecond = (totalDuration: number): [number, number] => {
    const minute = Math.floor(totalDuration / 60);
    const second = Math.floor(totalDuration) % 60;

    return [minute, second];
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
      <p>
        {`${currentTime.minute}:${String(currentTime.second).padStart(2, "0")}`} /{" "}
        {`${videoDuration.minute}:${String(videoDuration.second).padStart(2, "0")}`}
      </p>
      <button onClick={handlePlayback}>Play/Pause</button>
    </div>
  );
}
