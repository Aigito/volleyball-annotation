import { useLoaderData } from "react-router";

export default function AnnotationsList() {
  const annotations = useLoaderData();

  return (
    <div>
      <ul>
        {annotations.map((annotation) => {
          return <li>{annotation.timestamp}</li>;
        })}
      </ul>
    </div>
  );
}
