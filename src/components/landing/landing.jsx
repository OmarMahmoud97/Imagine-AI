import WhatweDo from "./whatWeDo/WhatWeDo";
import { Link } from "react-router-dom";
import hamburger from "../../assets/icons/iconmonstr-menu-lined-240.png";

import videoBg from "../../assets/videos/imagine-ai.mp4";

import "./landing.scss";

const Landing = () => (
  <>
    <section className="landing">
      <div className="landing__overlay"></div>
      <video className="landing__video" src={videoBg} autoPlay loop muted />
      <div className="landing__content">
        <div className="landing__nav-btn">
          <Link to="/nav">
            <img className="landing__hamburger" src={hamburger} alt="" />{" "}
          </Link>
        </div>

        <h1 className="landing__text landing__text-top  animate__animated animate__bounceInUp">
          Don't call it a <span className="landing__dream">dream</span>
        </h1>
        <p className="landing__text  animate__animated animate__bounceInUp">
          Call it <span className="landing__reality">Reality</span>
        </p>
      </div>
    </section>
    <WhatweDo />
  </>
);
export default Landing;
