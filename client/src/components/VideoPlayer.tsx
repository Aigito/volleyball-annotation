import { useRef, useState } from "react";

export default function VideoPlayer() {
  const [currentTime, setCurrentTime] = useState({ minute: 0, second: 0 });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const onTimeUpdate = () => {
    const nextTime = videoRef?.current?.currentTime ?? 0;
    const minute = Math.floor(nextTime / 60);
    const second = Math.floor(nextTime) % 60;

    setCurrentTime({ minute, second });
  };

  return (
    <div>
      <video ref={videoRef} onTimeUpdate={onTimeUpdate} width="640" height="360" controls muted>
        <source src="../../test/test.MP4" />
      </video>
      <p>{`${currentTime.minute}:${String(currentTime.second).padStart(2, "0")}`}</p>
    </div>
  );
}
