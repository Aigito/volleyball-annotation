import { createBrowserRouter, Navigate } from "react-router";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Settings from "./pages/Settings";
import VideosList from "./pages/VideosList";
import { createAnnotation, getAnnotations } from "./api/annotations";
import { getVideos } from "./api/videos";
import AnnotationsList from "./pages/AnnotationsList";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <Navigate to="/videos" /> },
      {
        path: "videos",
        children: [
          {
            index: true,
            element: <VideosList />,
            loader: async ({ request: { signal } }) => {
              const videos = await getVideos({ signal });
              return videos.data;
            },
          },
          {
            path: ":videoId",
            element: <Video />,
            action: async ({ request }) => {
              const { timestamp, canvasDrawing } = await request.json();
              await createAnnotation({ timestamp, canvasDrawing }, { signal: request.signal });
            },
          },
        ],
      },
      {
        path: "annotations",
        children: [
          {
            index: true,
            element: <AnnotationsList />,
            loader: async ({ request: { signal } }) => {
              const annotations = await getAnnotations({ signal });

              return annotations.data;
            },
          },
        ],
      },
      { path: "settings", element: <Settings /> },
    ],
  },
]);
