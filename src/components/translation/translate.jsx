import axios from "axios";
import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase";

import VoiceToText from "../VoiceToText/VoiceToText";
import "./translate.scss";
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
    console.log(data.output_url);
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
      console.log("I was added to the db");
    };

    saveImg();
  };

  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [result, setResult] = useState("");

  recognition.onresult = function (e) {
    let transcript = e.results[0][0].transcript;

    setResult(transcript);
  };

  const onClickHandler = () => {
    recognition.start();
    setIsSpeaking(!isSpeaking);
  };

  return (
    <div className="create">
      <form className="create__form" onSubmit={(e) => submitHandler(e)}>
        <label htmlFor="prompt">Prompt</label>
        <VoiceToText
          onClick={onClickHandler}
          isSpeaking={isSpeaking}
          result={result}
        />
        <input
          type="text"
          id="prompt"
          name="prompt"
          value={result}
          //this allows the input to take both text and voice input
          onChange={(e) => {
            setResult(e.target.value);
          }}
          className="create__input"
        />
        <button type="submit">Submit</button>
      </form>
      {/* Shorthand if statement "if the image state is truthy, show the <img> tag" */}
      <div className="create__image-container-wrapper">
        <div className="create__image-container">
          {image && (
            <img
              className="create__image"
              src={image.output_url}
              alt="AI Art"
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default Translate;
