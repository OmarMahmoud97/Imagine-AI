import axios from "axios";
import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase";
import hamburger from "../../assets/icons/iconmonstr-menu-lined-240.png";
import { Link } from "react-router-dom";
import VoiceToText from "../VoiceToText/VoiceToText";
import "./translate.scss";
import { saveAs } from "file-saver";
function Translate() {
  // State to store the API result
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const downloadImage = () => {
    saveAs(`${image.output_url}`, "image.jpg");
  };

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
    setIsLoading(true);
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
    setIsLoading(false);
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
      <div className="landing__nav-btn">
        <Link to="/nav">
          <img className="landing__hamburger" src={hamburger} alt="" />
        </Link>
      </div>
      <form className="create__form" onSubmit={(e) => submitHandler(e)}>
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
          onChange={(e) => {
            setResult(e.target.value);
          }}
          className="create__input"
          placeholder="Click on the left to speak or Type input here ..."
        />
        <button className="nav__create" type="submit">
          Submit
        </button>
      </form>
      <div className="create__image-container-wrapper">
        <div className="create__image-container">
          {image && (
            <img
              className="create__image"
              src={image.output_url}
              alt="AI Art"
            />
          )}
          {isLoading && <h2 className="create__loading">Loading...</h2>}
        </div>
        <button onClick={downloadImage}>DOWNLOAD</button>
      </div>
    </div>
  );
}
export default Translate;
