import axios from "axios";
import { useState, type SubmitEvent } from "react";
import type { Video } from "../types/video";

function Home() {
  const [videos, setVideos] = useState<Video[]>([]);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const videoUrl = formData.get("video-url") as string;
    const videoTitle = formData.get("video-title") as string;
    const video: Video = { url: videoUrl, title: videoTitle };

    setVideos((prev) => [...prev, video]);

    axios.post("http://localhost:3000/videos", {
      url: videoUrl,
      title: videoTitle,
    });

    // TODO:
    // 1. Save video URL to DB
    // 2. Re-render list of URL
    // 3. Filter list by users (once login and cookies is implemented)
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="video-url">
          Video URL
          <input type="text" id="video-url" name="video-url" />
        </label>
        <label htmlFor="video-title">
          Video Name
          <input type="text" id="video-title" name="video-title" />
        </label>
        <button type="submit">Add Video</button>
      </form>
      <ul>
        {videos.map(({ url, title }) => (
          <li>
            {url} - {title}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Home;
