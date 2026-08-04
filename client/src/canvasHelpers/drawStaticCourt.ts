export default function drawStaticCourt(ctx: CanvasRenderingContext2D) {
  // paint the court background
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, 200, 400);

  // draw outer boundaries
  ctx.strokeStyle = "white";
  ctx.strokeRect(5, 10, 190, 380);

  // draw the net
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.moveTo(5, 200);
  ctx.lineTo(195, 200);
  ctx.stroke();
  ctx.closePath();

  // draw 3m line
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.moveTo(5, 137);
  ctx.lineTo(195, 137);
  ctx.moveTo(5, 263);
  ctx.lineTo(195, 263);
  ctx.stroke();
  ctx.closePath();
}
