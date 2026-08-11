import { useEffect, useRef, type RefObject } from "react";
import drawStaticCourt from "../canvasHelpers/drawStaticCourt";
import getCanvasPoint from "../canvasHelpers/getCanvasPoint";

export default function useCanvasDrawing(canvasRef: RefObject<HTMLCanvasElement | null>) {
  const startingCoors = [
    {
      x: 50,
      y: 50,
    },
    {
      x: 50,
      y: 100,
    },
    {
      x: 6,
      y: 8,
    },
    {
      x: 6,
      y: 150,
    },
  ];

  const strokesRef = useRef([startingCoors]);
  const currentPointRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const drawModeRef = useRef(false);

  const reRenderPreviousStrokes = (ctx: CanvasRenderingContext2D) => {
    // Example re-rendering of previously stored strokes
    // TODO: Read from `strokes` state, forEach do a stroke for each coordinate

    strokesRef.current.forEach((group) => {
      const initialPoint = group[0];
      ctx.strokeStyle = "blue";
      ctx.beginPath();
      ctx.moveTo(initialPoint.x, initialPoint.y);

      for (let i = 1; i < group.length; i++) {
        const { x, y } = group[i];
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.closePath();
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    drawStaticCourt(ctx);
    reRenderPreviousStrokes(ctx);

    const handleMouseMove = (e: MouseEvent) => {
      const drawMode = drawModeRef.current;

      if (drawMode) {
        // TODO: store current {x,y} to last element of strokes (remember to spread otherwise React will not re-render)
        const { x: prevX, y: prevY } = currentPointRef.current;
        const { x: currX, y: currY } = getCanvasPoint(canvas, e);
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
  }, [canvasRef]);
}
