import axios from "axios";
import { useRef } from "react";
import useCanvasDrawing from "../hooks/useCanvasDrawing";

export default function CourtDiagram() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const handleSaveAnnotation = async () => {
    // TODO: To call a post route instead
    // TODO: Need to grab all other relevant info: videoId, timestamp, annotation strokes
    const res = await axios.get("http://localhost:3000/annotations");

    console.log(res);
  };

  useCanvasDrawing(canvasRef);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={200}
        height={400}
        style={{ border: "1px solid #000000" }}
      ></canvas>
      <button onClick={handleSaveAnnotation}>Save Annotation</button>
    </div>
  );
}
