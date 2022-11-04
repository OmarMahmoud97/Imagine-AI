import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import "./createBlog.scss";
function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postsCollectionRef = collection(db, "blogPosts");
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/blog");
  };

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <div className="blog__page">
      <div className="blog__container-create">
        <h1 className="blog__create-header">Create A Post</h1>
        <input
          className="blog__input-title"
          placeholder="Title..."
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        <textarea
          className="blog__input-item"
          placeholder="Post..."
          onChange={(event) => {
            setPostText(event.target.value);
          }}
        />
        <button className="nav__login" onClick={createPost}>
          {" "}
          Submit Post
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
