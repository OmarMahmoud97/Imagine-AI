import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import "./createBlog.scss";
import { Link } from "react-router-dom";
import hamburger from "../../../assets/icons/iconmonstr-menu-lined-240.png";
import { v4 as uuid } from "uuid";

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState("");
  const postsCollectionRef = collection(db, "blogPosts");
  let navigate = useNavigate();

  const createPost = async () => {
    const storage = getStorage();
    const storageRef = ref(storage, `blog-images/${uuid()}`);
    const snapshot = await uploadBytes(storageRef, image);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    await addDoc(postsCollectionRef, {
      title,
      postText,
      image: downloadUrl,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
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
      <div className="landing__nav-btn">
        <Link to="/nav">
          <img className="landing__hamburger" src={hamburger} alt="" />
        </Link>
      </div>
      <div className="blog__container-create">
        <h1 className="blog__create-header">Create A Post</h1>
        <input
          className="blog__input-title"
          placeholder="Title..."
          required
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        <textarea
          className="blog__input-item"
          placeholder="Post..."
          required
          onChange={(event) => {
            setPostText(event.target.value);
          }}
        />
        <input
          type="file"
          className="blog__file"
          name="filename"
          onChange={(event) => {
            setImage(event.target.files[0]);
          }}
        />

        <button className="nav__login" onClick={createPost}>
          Submit Post
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
