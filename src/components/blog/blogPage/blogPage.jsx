import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import trash from "../../../assets/icons/iconmonstr-trash-can-28-240.png";
import { Link } from "react-router-dom";
import hamburger from "../../../assets/icons/iconmonstr-menu-lined-240.png";
import "./blogPage.scss";
function Blog() {
  const [postLists, setPostList] = useState();
  const postsCollectionRef = collection(db, "blogPosts");
  const [image, setImage] = useState();
  const getPosts = async () => {
    const data = await getDocs(postsCollectionRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deletePost = async (id) => {
    const postDoc = doc(db, "blogPosts", id);
    await deleteDoc(postDoc);
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (!postLists) {
    return <p>Loading...</p>;
  }
  return (
    <div className="blog">
      <div className="landing__nav-btn">
        <Link to="/nav">
          <img className="landing__hamburger" src={hamburger} alt="" />
        </Link>
      </div>
      <div className="blog__header">
        <h1>Blogs</h1>
      </div>

      <div className="blog__container">
        {postLists.map((post) => {
          return (
            <div key={post.id} className="blog__post">
              <div className="blog__header">
                <div className="blog__title">
                  <h1 className="blog__title-text"> {post.title}</h1>
                </div>
                <h3 className="blog__name">Created By:{post.author.name}</h3>

                {post?.image ? (
                  <img
                    className="blog__image"
                    src={post.image}
                    alt="No Image"
                  ></img>
                ) : (
                  ""
                )}

                <div className="blog__deletePost">
                  {auth.currentUser && post.author.id === auth.currentUser.uid && (
                    <button
                      className="blog__delete"
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      <img className="images__trash" src={trash} alt="" />
                    </button>
                  )}
                </div>
              </div>
              <div className="blog__text"> {post.postText} </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Blog;
