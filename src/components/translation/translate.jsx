import axios from "axios";
import "./translate.scss";
import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase";

function Translate() {
  // State to store the API result
  const [image, setImage] = useState(null);

  // Reference to the database table in firebase
  const postsCollectionRef = collection(db, "images");

  // What to do on form submit
  const submitHandler = (e) => {
    e.preventDefault();

    // Get the form value
    const prompt = e.target.prompt.value;

    // Run the function which hits the API
    getImage(prompt);
  };

  // The asyncronous function, which takes in the prompt as a param
  // And uses that prompt to hit the API
  const getImage = async (prompt) => {
    // Hit our backend, with a POST request and sending the prompt
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/image`,
      {
        user_prompt: prompt,
      }
    );

    // Save the response in state
    setImage(data);

    // Save the response in firebase (images DB table)
    const saveImg = async () => {
      await addDoc(postsCollectionRef, {
        data,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
      });
    };

    saveImg();
  };

  // if (!image) {
  //   return <h1>Loading...</h1>;
  // }

  return (
    <div className="translate">
      <form onSubmit={(e) => submitHandler(e)}>
        <label htmlFor="prompt">Prompt</label>
        <input
          type="text"
          id="prompt"
          name="prompt"
          className="translate__input"
        />
        <button type="submit">Submit</button>
      </form>
      {/* Shorthand if statement "if the image state is truthy, show the <img> tag" */}
      {image && <img src={image.output_url} alt="AI Art" />}
    </div>
  );
}
export default Translate;
