import { useEffect, useRef } from "react";
import drawStaticCourt from "../canvasHelpers/drawStaticCourt";

export default function CourtDiagram() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nextPointRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    if (!ctx) return;

    drawStaticCourt(ctx);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const getCanvasPoint = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    };

    const grabNextPoint = (e: MouseEvent) => {
      nextPointRef.current = getCanvasPoint(e);
    };

    const logNextPoint = (e: MouseEvent) => {
      nextPointRef.current = getCanvasPoint(e);
      console.log("next point", nextPointRef.current);
    };

    canvas.addEventListener("mousemove", grabNextPoint);
    canvas.addEventListener("mousedown", logNextPoint);

    return () => {
      canvas.removeEventListener("mousemove", grabNextPoint);
      canvas.removeEventListener("mousedown", logNextPoint);
    };
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
