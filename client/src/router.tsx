import { createBrowserRouter } from "react-router";
import Video from "./pages/Video";
import Home from "./pages/Home";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/video", element: <Video /> },
]);
