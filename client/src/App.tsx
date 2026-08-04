import CourtDiagram from "./components/CourtDiagram";
import VideoPlayer from "./components/VideoPlayer";
import "./App.css";

function App() {
  return (
    <div className="container">
      <VideoPlayer />
      <CourtDiagram />
    </div>
  );
}

export default App;
