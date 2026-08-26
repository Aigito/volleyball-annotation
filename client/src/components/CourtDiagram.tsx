import { useRef } from "react";
import useCanvasDrawing from "../hooks/useCanvasDrawing";
import type { Stroke } from "../types/annotation";
import { createAnnotation } from "../api/annotations";

type CourtDiagramProp = {
  timestamp: number;
};

export default function CourtDiagram({ timestamp }: CourtDiagramProp) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const strokesRef = useRef<Stroke[]>([]);
  const controller = new AbortController();

  const { resetCanvas } = useCanvasDrawing(canvasRef, strokesRef);

  const handleSaveAnnotation = async () => {
    await createAnnotation(
      { timestamp, canvasDrawing: strokesRef.current },
      { signal: controller.signal },
    );
    // TODO: Grab videoID from params

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
