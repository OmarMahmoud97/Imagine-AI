import "./footer.scss";
import github from "../../assets/icons/iconmonstr-github-3-240.png";
import linkedin from "../../assets/icons/iconmonstr-linkedin-3-240 (1).png";
import mail from "../../assets/icons/iconmonstr-mail-thin-240.png";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__container ">
        <p className="footer__text">Creator: Omar Mahmoud</p>

        <div className="footer__icon-wrapper">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/OmarMahmoud97"
          >
            <img className="footer__icon" src={github}></img>
          </a>
          <a href="mailto:OmarMahmoud997@hotmail.com">
            <img className="footer__icon" src={mail}></img>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/omar-mahmoud97/"
          >
            <img className="footer__icon" src={linkedin}></img>
          </a>
        </div>
        <p className="footer__text-bottom">Utilising the power of Deep AI</p>
      </div>
    </div>
  );
};

export default Footer;
