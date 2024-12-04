import React, { useState } from "react";
import axios from "axios";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [blog_text, setBlog_text] = useState("");
  const [file, setFile] = useState(null);

  const API = "http://127.0.0.1:8000/api/home/blog/";
  const accessToken = localStorage.getItem("accessToken");

  const handlecreate = async () => {
    if (!accessToken) {
      alert("You must be logged in to create a post.");
      window.location.href = "/login"; 
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("blog_text", blog_text);
    if (file) formData.append("main_image", file);

    try {
      const res = await axios.post(API, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Post created:", res.data);
      alert("Post created successfully!");
      if(res.status === 200){
        Navigate('/')
    }
    } catch (error) {
      console.error("Error creating post:", error);
      if (error.response?.status === 401) {
        alert("Unauthorized! Please log in again.");
        window.location.href = "/login";
      } else {
        alert("Failed to create post. Try again.");
      }
    }
  };

  return (
    <>
      <h1>Create A Post</h1>
      <input
        type="text"
        name="title"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        name="blog_text"
        placeholder="Blog text..."
        value={blog_text}
        onChange={(e) => setBlog_text(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handlecreate}>Create Post</button>
    </>
  );
}

export default CreatePost;
