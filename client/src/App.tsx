import CourtDiagram from "./components/CourtDiagram";
import VideoPlayer from "./components/VideoPlayer";
import "./App.css";
import { useState } from "react";

function App() {
  const [timestamp, setTimestamp] = useState(0);

  return (
    <div className="container">
      <VideoPlayer setTimestamp={setTimestamp} />
      <CourtDiagram timestamp={timestamp} />
    </div>
  );
}

export default App;
