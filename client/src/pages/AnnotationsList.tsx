import { useLoaderData } from "react-router";
import type { Annotation } from "../types/annotation";

export default function AnnotationsList() {
  const annotations = useLoaderData();

  return (
    <div>
      <ul>
        {annotations.map(({ timestamp }: Annotation) => {
          return <li>{timestamp}</li>;
        })}
      </ul>
    </div>
  );
}
