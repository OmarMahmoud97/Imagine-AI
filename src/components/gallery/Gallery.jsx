import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import trash from "../../assets/icons/iconmonstr-trash-can-28-240.png";

import "./Gallery.scss";
function Image(user) {
  const [imageLists, setImageList] = useState();
  const postsCollectionRef = collection(db, "images");

  const getPosts = async () => {
    const data = await getDocs(postsCollectionRef);
    setImageList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deletePost = async (id) => {
    const postDoc = doc(db, "images", id);
    await deleteDoc(postDoc);
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (!imageLists) {
    return <p>Loading...</p>;
  }
  return (
    <div className="images">
      <div className="images__header">
        <h1 className="images__title">Images</h1>
      </div>
      <div className="images__container">
        {imageLists.map((post) => {
          // console.log(post.data.output_url);

          return (
            <div key={post.id}>
              <img
                className="images__post"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "https://via.placeholder.com/1024";
                }}
                src={`${post.data.output_url}`}
                alt=""
              />
              <div className="images__header">
                <div className="images__title">
                  <h1> {post.title}</h1>
                </div>
                <div className="images__header">
                  <h3 className="images__name">
                    Created By:{post.author.name}
                  </h3>
                  <div className="images__deletePost">
                    {user && post.author.id === auth.currentUser.uid && (
                      <button
                        className="images__delete"
                        onClick={() => {
                          deletePost(post.id);
                        }}
                      >
                        <img className="images__trash" src={trash} alt="" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Image;
