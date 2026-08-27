export type Stroke = { x: number; y: number }[];
export type AnnotationInput = { timestamp: number; canvasDrawing: Stroke[] };
export type Annotation = AnnotationInput & { _id: string };
