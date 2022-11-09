import "./WhatWeDo.scss";
import signup from "../../../assets/images/animation_640_la1egwrh.gif";
import create from "../../../assets/images/animation_640_la0zmo2v.gif";
import share from "../../../assets/images/animation_640_la1gexav.gif";
import "animate.css";

const WhatweDo = () => (
  <section className="WhatWeDo">
    <h2 className="WhatWeDo__title">WHAT IT'S ALL ABOUT!</h2>
    <div className="WhatWeDo__container ">
      <div className="WhatWeDo__one animate__animated animate__bounceInUp">
        <div className="WhatWeDo__innerWrapper">
          <img className="WhatWeDo__img" src={signup}></img>
          <h3 className="WhatWeDo__header">Sign Up</h3>
          <div className="WhatWeDo__wrapper">
            <div className="WhatWeDo__text">
              Click Login on the navigation bar to sign up for free & unlimited
              access to some of the worlds smartest artificial intelligence.
              Choose your preferred choice of sign up and within a few click you
              can get started!
            </div>
          </div>
        </div>
      </div>
      <div className="WhatWeDo__two animate__animated animate__bounceInUp">
        <div className="WhatWeDo__innerWrapper">
          <img className="WhatWeDo__img" src={create}></img>
          <h3 className="WhatWeDo__header">Start Making</h3>
          <div className="WhatWeDo__wrapper">
            <div className="WhatWeDo__text">
              Harness the power of artificial intelligence at your fingertips!
              Bring your imagination to life. with a couple words or even a
              paragraph the ai will pick up what you have typed and scour the
              internet finding information to then provide you with 4 images for
              you to download. <br /> <br /> Congrats! You just turned a dream
              to reality.
            </div>
          </div>
        </div>
      </div>
      <div className="WhatWeDo__three animate__animated animate__bounceInUp">
        <div className="WhatWeDo__innerWrapper">
          <img className="WhatWeDo__img" src={share}></img>

          <h3 className="WhatWeDo__header">Share</h3>
          <div className="WhatWeDo__wrapper">
            <div className="WhatWeDo__text">
              Upload your favorite creations & Share your AI experiences! <br />
              Inspire peoples ideas by sharing your prompts and explain the
              story behind it! <br />
              <br /> Every Ai generated image is unique to You and the world
              would love to see it!
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
export default WhatweDo;
