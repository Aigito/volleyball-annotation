import { useEffect, useRef } from "react";
import drawStaticCourt from "../canvasHelpers/drawStaticCourt";

export default function CourtDiagram() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nextPointRef = useRef<{ x: number; y: number } | null>(null);
  const drawModeRef = useRef(false);

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

    const handleMouseMove = (e: MouseEvent) => {
      if (drawModeRef.current) {
        nextPointRef.current = getCanvasPoint(e);

        // TODO: Change this to actually drawing a line
        console.log(nextPointRef.current);
      }
    };

    const handleMouseDown = () => {
      drawModeRef.current = true;
    };

    const handleMouseUp = () => {
      drawModeRef.current = false;
    };

    // TODO: To implement setting draw mode to false when mouse leaves canvas

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
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
