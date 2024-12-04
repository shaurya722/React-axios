import React, { useEffect, useState } from "react";
import axios from "axios";

function Movies() {
  const [data, setData] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);  
  const [currentPost, setCurrentPost] = useState(null);  
  const [newTitle, setNewTitle] = useState("");  
  const [newBlogText, setNewBlogText] = useState("");  
  const API = "http://127.0.0.1:8000/api/home/blog/";
  const accessToken = localStorage.getItem("accessToken");

  // Function to fetch data from API
  const getAPI = async () => {
    try {
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("Fetched data:", res.data.data);
      setData(res.data.data);  
    } catch (e) {
      console.log("Error fetching data:", e);
      alert("Failed to fetch posts.");
    }
  };

  useEffect(() => {
    if (accessToken) {
      getAPI();
    } else {
      alert("Please log in.");
    }
  }, [accessToken]);

  // Function to handle deleting a post (sending uuid in body)
  const handleDelete = async (uuid) => {
    if (!accessToken) {
      alert("Please log in again.");
      return;
    }

    try {
      const res = await axios.delete(API, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        data: { uuid: uuid },  
      });
      console.log("Post deleted:", res.data);
      setData(data.filter(item => item.uuid !== uuid));  
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete the post.");
    }
  };

  // Function to handle opening the update form
  const handleUpdateClick = (post) => {
    setCurrentPost(post);  
    setNewTitle(post.title);  
    setNewBlogText(post.blog_text);  
    setShowOverlay(true);  
  };

  // Function to handle updating a post
  const handleUpdate = async () => {
    if (!newTitle || !newBlogText) {
      alert("Both fields are required!");
      return;
    }

    if (!accessToken) {
      alert("Please log in again.");
      return;
    }

    try {
      const res = await axios.patch(API, 
        {
          uuid: currentPost.uuid,  
          title: newTitle,
          blog_text: newBlogText
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      console.log("Post updated:", res.data);
      alert("Post updated successfully!");
      setShowOverlay(false);  
      getAPI();  
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update the post.");
    }
  };

  return (
    <>
      <div>
        <h1>Blogs</h1>
        {data.map((item, index) => (
          <div key={index}>
            <h2>{item.title}</h2>
            <p>{item.blog_text}</p>
            <img
              src={`http://127.0.0.1:8000${item.main_image}`}
              width={500}
              alt={item.title}
            />
            <button onClick={() => handleDelete(item.uuid)}>Delete</button>
            <button onClick={() => handleUpdateClick(item)}>Update</button>
          </div>
        ))}
      </div>

      {showOverlay && (
        <div style={overlayStyles}>
          <div style={modalStyles}>
            <h2>Update Post</h2>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="New Title"
            />
            <textarea
              value={newBlogText}
              onChange={(e) => setNewBlogText(e.target.value)}
              placeholder="New Blog Text"
            />
            <button onClick={handleUpdate}>Update Post</button>
            <button onClick={() => setShowOverlay(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

const overlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyles = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
};

export default Movies;
