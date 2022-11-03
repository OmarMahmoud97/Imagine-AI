import WhatweDo from "./whatWeDo/WhatWeDo";

import videoBg from "../../assets/videos/imagine-ai.mp4";

import "./landing.scss";

const Landing = () => (
  <>
    <section className="landing">
      <div className="landing__overlay"></div>
      <video className="landing__video" src={videoBg} autoPlay loop muted />
      <div className="landing__content">
        <h1 className="landing__text  animate__animated animate__bounceInUp">
          Don't call it a dream
        </h1>
        <p className="landing__text  animate__animated animate__bounceInUp">
          Call it a plan
        </p>
      </div>
    </section>
    <WhatweDo />
  </>
);
export default Landing;
