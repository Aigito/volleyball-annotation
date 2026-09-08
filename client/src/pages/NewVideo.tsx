import { useState, type SubmitEvent } from "react";
import { Form } from "react-router";

const YOUTUBE_URL_RE =
  /^(https?:\/\/)?(www\.|m\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;

type FieldErrors = { url?: string; title?: string };

const validateUrl = (url: string) => {
  if (!url.trim()) return "URL is required";
  if (!YOUTUBE_URL_RE.test(url)) return "URL must be a valid YouTube link";
};

const validateTitle = (title: string) => {
  if (!title.trim()) return "Title is required";
};

export function NewVideo() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    if (Object.keys(errors).length > 0) {
      e.preventDefault();
    }
  };

  const errors: FieldErrors = {};
  const urlError = validateUrl(url);
  if (urlError) errors.url = urlError;
  const titleError = validateTitle(title);
  if (titleError) errors.title = titleError;

  return (
    <div>
      <h2>New Video</h2>
      <Form method="post" onSubmit={handleSubmit}>
        <label htmlFor="url">URL</label>
        <input id="url" name="url" type="text" onChange={(e) => setUrl(e.target.value)} />
        {errors.url && <p>{errors.url}</p>}
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" onChange={(e) => setTitle(e.target.value)} />
        {errors.title && <p>{errors.title}</p>}
        <button type="submit">Add Video</button>
      </Form>
    </div>
  );
}

export async function NewVideoAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const url = formData.get("url");
  const title = formData.get("title");

  console.log(url, title);
}
