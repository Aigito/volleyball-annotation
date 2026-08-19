import CourtDiagram from "./components/CourtDiagram";
import VideoPlayer from "./components/VideoPlayer";
import "./App.css";
import { useState } from "react";

function App() {
  const [currentTime, setCurrentTime] = useState({ minute: 0, second: 0 });

  return (
    <div className="container">
      <VideoPlayer currentTime={currentTime} setCurrentTime={setCurrentTime} />
      <CourtDiagram currentTime={currentTime} />
    </div>
  );
}

export default App;
