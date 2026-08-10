import { useRef } from "react";
import useCanvasDrawing from "../hooks/useCanvasDrawing";

export default function CourtDiagram() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useCanvasDrawing(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={400}
      style={{ border: "1px solid #000000" }}
    ></canvas>
  );
}
