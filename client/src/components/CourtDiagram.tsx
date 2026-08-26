import { useRef } from "react";
import useCanvasDrawing from "../hooks/useCanvasDrawing";
import type { Stroke } from "../types/annotation";
import { useParams, useSubmit } from "react-router";

type CourtDiagramProp = {
  timestamp: number;
};

export default function CourtDiagram({ timestamp }: CourtDiagramProp) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const strokesRef = useRef<Stroke[]>([]);
  const submit = useSubmit();
  const params = useParams();

  const { resetCanvas } = useCanvasDrawing(canvasRef, strokesRef);

  const handleSaveAnnotation = async () => {
    const videoId = params.videoId;

    submit(
      { timestamp, canvasDrawing: strokesRef.current },
      { action: `/videos/${videoId}`, method: "post", encType: "application/json" },
    );

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
