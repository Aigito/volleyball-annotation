import axios from "axios";
import { useRef } from "react";
import useCanvasDrawing from "../hooks/useCanvasDrawing";

type CourtDiagramProp = {
  timestamp: number;
};

export default function CourtDiagram({ timestamp }: CourtDiagramProp) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const handleSaveAnnotation = async () => {
    await axios.post("http://localhost:3000/annotations", {
      // TODO: Grab videoID from params
      timestamp,
      canvasDrawing: strokes,
    });
  };

  const strokes = useCanvasDrawing(canvasRef);

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
