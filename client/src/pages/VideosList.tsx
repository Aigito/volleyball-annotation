import { Link, useLoaderData } from "react-router";
import type { Video } from "../types/video";

export default function VideosList() {
  const videos = useLoaderData();

  return (
    <div>
      <ul>
        {videos.map(({ _id, url }: Video) => {
          return (
            <li key={_id}>
              <Link to={_id}>{url}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
