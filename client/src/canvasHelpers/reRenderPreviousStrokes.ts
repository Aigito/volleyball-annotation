import { type RefObject } from "react";

export default function reRenderPreviousStrokes(
  strokesRef: RefObject<{ x: number; y: number }[][]>,
  ctx: CanvasRenderingContext2D,
) {
  // TODO: Re-rendering from hardcoded coors, now need to re-render from saved DB (can't do it from ref as ref gets re-initialized upon refreshing page)

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
}
