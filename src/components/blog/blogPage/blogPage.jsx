import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../firebase";

function Blog(user) {
  const [postLists, setPostList] = useState();
  const postsCollectionRef = collection(db, "blogPosts");

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
  console.log(postLists);

  return (
    <div className="homePage">
      <h1>Blogs123</h1>
      {postLists.map((post) => {
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1> {post.title}</h1>
              </div>
              <div className="deletePost">
                {console.log(post.author.id)}
                {console.log(auth.currentUser.uid)}
                {console.log(user)}
                {user && post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
            <div className="postTextContainer"> {post.postText} </div>
            <h3>@{post.author.name}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Blog;
