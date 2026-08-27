import { createBrowserRouter, Navigate } from "react-router";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Settings from "./pages/Settings";
import VideosList from "./pages/VideosList";
import { createAnnotation } from "./api/annotations";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <Navigate to="/videos" /> },
      {
        path: "videos",
        children: [
          { index: true, element: <VideosList /> },
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
      { path: "settings", element: <Settings /> },
    ],
  },
]);
