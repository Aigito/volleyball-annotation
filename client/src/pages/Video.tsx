import "../styles/Video.css";
import { useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import CourtDiagram from "../components/CourtDiagram";

function Video() {
  const [timestamp, setTimestamp] = useState(0);

  return (
    <div className="container">
      <VideoPlayer setTimestamp={setTimestamp} />
      <CourtDiagram timestamp={timestamp} />
    </div>
  );
}

export default Video;
