import "./navbar.scss";
import logo from "../..//assets/images/chatty-traveler-logo.png";
const NavPage = () => (
  <nav className="nav">
    <ul className="nav__container">
      <img src={logo} alt="logo" className="nav__logo" />
      <div className="nav__links">
        <li className="nav__item">Translation</li>
        <li className="nav__item">Flights</li>
        <li className="nav__item">Hotels</li>
        <li className="nav__item">Restaurants</li>
        <li className="nav__item">Activities</li>
        <li className="nav__item">Chat Log</li>
      </div>
    </ul>
  </nav>
);
export default NavPage;
