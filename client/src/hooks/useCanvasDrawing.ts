import { useCallback, useEffect, useRef, type RefObject } from "react";
import drawStaticCourt from "../canvasHelpers/drawStaticCourt";
import getCanvasPoint from "../canvasHelpers/getCanvasPoint";
import reRenderPreviousStrokes from "../canvasHelpers/reRenderPreviousStrokes";
import type { Stroke } from "../types/annotation";

export default function useCanvasDrawing(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  strokesRef: RefObject<Stroke[]>,
) {
  const currentPointRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const drawModeRef = useRef(false);

  const resetCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    strokesRef.current = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStaticCourt(ctx);
  }, [canvasRef, strokesRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    drawStaticCourt(ctx);

    // TODO: Move reRenderPreviousStrokes in future to when we can navigate to specific timestamp
    reRenderPreviousStrokes(strokesRef, ctx);

    const handleMouseMove = (e: MouseEvent) => {
      const drawMode = drawModeRef.current;

      if (drawMode) {
        const strokes = strokesRef.current;
        const latestStrokeGroup = strokes[strokes.length - 1];
        const { x: prevX, y: prevY } = currentPointRef.current;
        const { x: currX, y: currY } = getCanvasPoint(canvas, e);

        // push coordinates into latest stroke group[]
        latestStrokeGroup.push({ x: currX, y: currY });

        currentPointRef.current = { x: currX, y: currY };

        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.stroke();
        ctx.closePath();
      } else {
        currentPointRef.current = getCanvasPoint(canvas, e);
      }
    };

    const handleMouseDown = () => {
      // start a new stroke group
      strokesRef.current.push([]);
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
  }, [canvasRef, strokesRef]);

  return { resetCanvas };
}
