export default function CourtDiagram() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={100}
      style={{ border: "1px solid #000000" }}
    ></canvas>
  );
}
