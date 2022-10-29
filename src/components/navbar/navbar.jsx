import "./navbar.scss";
import logo from "../..//assets/images/chatty-traveler-logo.png";
const NavPage = () => (
  <nav className="nav">
    <ul className="nav__container">
      <img src={logo} alt="logo" className="nav__logo" />
      <div className="nav__links">
        <div className="nav__dropdown">
          <select className="nav__dropdown-menu">
            <option>Book</option>
            <option>Flights</option>
            <option>Hotels</option>
            <option>Restaurants</option>
          </select>
        </div>
        <li className="nav__item">Translation</li>
        <li className="nav__item">Chat Log</li>
      </div>
    </ul>
  </nav>
);
export default NavPage;
