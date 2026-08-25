import { createBrowserRouter, Navigate } from "react-router";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Settings from "./pages/Settings";
import VideosList from "./pages/VideosList";

export const router = createBrowserRouter([
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
          },
        ],
      },
      { path: "settings", element: <Settings /> },
    ],
  },
]);
