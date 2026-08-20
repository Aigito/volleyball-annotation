import axios from "axios";
import { useRef } from "react";
import useCanvasDrawing from "../hooks/useCanvasDrawing";
import type { Stroke } from "../types/annotation";

type CourtDiagramProp = {
  timestamp: number;
};

export default function CourtDiagram({ timestamp }: CourtDiagramProp) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const strokesRef = useRef<Stroke[]>([]);

  const { resetCanvas } = useCanvasDrawing(canvasRef, strokesRef);

  const handleSaveAnnotation = async () => {
    await axios.post("http://localhost:3000/annotations", {
      // TODO: Grab videoID from params
      timestamp,
      canvasDrawing: strokesRef.current,
    });

    resetCanvas();
  };

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
