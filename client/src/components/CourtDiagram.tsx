import { useEffect, useRef } from "react";
import drawStaticCourt from "../canvasHelpers/drawStaticCourt";

export default function CourtDiagram() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentPointRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const drawModeRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    drawStaticCourt(ctx);

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
      const drawMode = drawModeRef.current;

      if (drawMode) {
        const { x: prevX, y: prevY } = currentPointRef.current;
        const { x: currX, y: currY } = getCanvasPoint(e);
        currentPointRef.current = { x: currX, y: currY };

        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.stroke();
        ctx.closePath();
      } else {
        currentPointRef.current = getCanvasPoint(e);
      }
    };

    const handleMouseDown = () => {
      drawModeRef.current = true;
    };

    const handleMouseUp = () => {
      drawModeRef.current = false;
    };

    const handleMouseLeave = () => {
      drawModeRef.current = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
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
