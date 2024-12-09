import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate for redirection

function Movies() {
  const [data, setData] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newBlogText, setNewBlogText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const API = "http://127.0.0.1:8000/api/home/blog/";
  const accessToken = localStorage.getItem("accessToken");  // Get token from localStorage
  const navigate = useNavigate();  // Initialize the useNavigate hook

  // Fetch data from API
  const getAPI = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setData(res.data.data);
    } catch (e) {
      setErrorMessage("Failed to fetch posts.");
      console.log("Error fetching data:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getAPI();  // Fetch data if logged in
    } else {
      navigate("/login");  // Redirect to login if no access token
    }
  }, [accessToken, navigate]);  // Dependency on accessToken to trigger re-fetch

  // Handle deleting a post
  const handleDelete = async (uuid) => {
    if (!accessToken) {
      alert("Please log in again.");
      return;
    }

    try {
      const res = await axios.delete(API, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        data: { uuid },
      });
      setData(data.filter((item) => item.uuid !== uuid)); // Remove from local state
      alert("Post deleted successfully!");
    } catch (error) {
      alert("Failed to delete the post.");
    }
  };

  // Handle opening the update form
  const handleUpdateClick = (post) => {
    setCurrentPost(post);
    setNewTitle(post.title);
    setNewBlogText(post.blog_text);
    setShowOverlay(true);
  };

  // Handle updating a post
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
      const res = await axios.patch(
        API,
        {
          uuid: currentPost.uuid,
          title: newTitle,
          blog_text: newBlogText,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setData(
        data.map((item) =>
          item.uuid === currentPost.uuid ? { ...item, title: newTitle, blog_text: newBlogText } : item
        )
      ); // Update locally without refetching
      setShowOverlay(false);
      alert("Post updated successfully!");
    } catch (error) {
      alert("Failed to update the post.");
    }
  };


  return (
    <>
      <h1>Blogs</h1>
      <div className="m-3 flex gap-4">

        {isLoading ? (
          <p>Loading...</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          data.map((item) => (
            <div key={item.uuid}>
              <h2 className="font-extralight">{item.title}</h2>
              <p className="font-mono">{item.blog_text}</p>
              <img
                src={`http://127.0.0.1:8000${item.main_image}`}
                width={500}
                alt={item.title}
              />
              <button className="p-3 gap-4 bg-black text-white m-4" onClick={() => handleDelete(item.uuid)}>Delete</button>
              <button className="p-3 gap-4 bg-black text-white" onClick={() => handleUpdateClick(item)}>Update</button>
            </div>
          ))
        )}
      </div>

      {showOverlay && (
        <div style={overlayStyles}>
          <div style={modalStyles}>
            <h2 className="font-extrabold">Update Post</h2>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="p-4 border-2"
              placeholder="New Title"
            />
            <textarea
              value={newBlogText}
              onChange={(e) => setNewBlogText(e.target.value)}
              className="p-4 border-2"
              placeholder="New Blog Text"
            />
            <button className="p-4 bg-black text-white m-4" onClick={handleUpdate}>Update Post</button>
            <button className="p-4 bg-black text-white" onClick={() => setShowOverlay(false)}>Close</button>
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
  padding:20,
};

const modalStyles = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
};

export default Movies;
