import axios from "axios";
import { useRef } from "react";
import useCanvasDrawing from "../hooks/useCanvasDrawing";

export default function CourtDiagram() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const handleSaveAnnotation = () => {
    axios.get("http://localhost:3000/");
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
