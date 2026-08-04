import { useEffect, useRef } from "react";

export default function CourtDiagram() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = canvasRef?.current?.getContext("2d");
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.stroke();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={100}
      style={{ border: "1px solid #000000" }}
    ></canvas>
  );
}
