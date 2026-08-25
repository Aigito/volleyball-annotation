import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Settings from "./pages/Settings";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/videos", element: <Video /> },
  { path: "/settings", element: <Settings /> },
]);
