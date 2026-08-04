import { useEffect, useRef } from "react";
import drawStaticCourt from "../canvasHelpers/drawStaticCourt";

export default function CourtDiagram() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    if (!ctx) return;

    drawStaticCourt(ctx);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={400}
      style={{ border: "1px solid #000000" }}
    ></canvas>
  );
}
