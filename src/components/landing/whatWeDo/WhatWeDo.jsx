import "./WhatWeDo.scss";
import vote from "../../../assets/images/1933-vote-elections-lineal.gif";
import create from "../../../assets/images/animation_640_la0zmo2v.gif";

const WhatweDo = () => (
  <section className="WhatWeDo">
    <h2 className="WhatWeDo__title">What We Do</h2>
    <div className="WhatWeDo__container ">
      <div className="WhatWeDo__one">
        <div className="WhatWeDo__innerWrapper">
          <img className="WhatWeDo__img" src={create}></img>
          <h3 className="WhatWeDo__header">Create</h3>
          <div className="WhatWeDo__wrapper">
            <div className="WhatWeDo__text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime
              in sint esse excepturi quo cupiditate ea debitis animi, ratione
              aliquam? Ea eum beatae animi excepturi voluptates eveniet.
            </div>
          </div>
        </div>
      </div>
      <div className="WhatWeDo__two">
        <div className="WhatWeDo__innerWrapper">
          <img className="WhatWeDo__img" src={vote}></img>
          <h3 className="WhatWeDo__header">Vote</h3>
          <div className="WhatWeDo__wrapper">
            <div className="WhatWeDo__text">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia
              corporis sed ab repellat doloremque eius, placeat expedita
              deleniti perferendis commodi, delectus id aperiam vitae.
            </div>
          </div>
        </div>
      </div>
      <div className="WhatWeDo__three">
        <div className="WhatWeDo__innerWrapper">
          <iframe
            className="WhatWeDo__iframe"
            src="https://embed.lottiefiles.com/animation/75783"
          ></iframe>
          <h3 className="WhatWeDo__header">Earn</h3>
          <div className="WhatWeDo__wrapper">
            <div className="WhatWeDo__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur quam laborum eveniet culpa rerum harum ratione
              architecto dolorem earum porro doloribus ducimus. delectus id
              aperiam vitae.
            </div>
          </div>
        </div>
      </div>
      <div className="WhatWeDo__four">
        <div className="WhatWeDo__innerWrapper">
          <iframe
            className="WhatWeDo__iframe"
            src="https://embed.lottiefiles.com/animation/107595"
          ></iframe>{" "}
          <h3 className="WhatWeDo__header">Chat</h3>
          <div className="WhatWeDo__wrapper">
            <div className="WhatWeDo__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur quam laborum eveniet culpa rerum harum ratione
              architecto dolorem earum porro doloribus ducimus. delectus id
              aperiam vitae.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
export default WhatweDo;
