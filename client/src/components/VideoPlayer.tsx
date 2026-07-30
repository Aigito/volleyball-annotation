import { useRef, useState } from "react";

export default function VideoPlayer() {
  const [currentTime, setCurrentTime] = useState({ minute: 0, second: 0 });
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
    </div>
  );
}
