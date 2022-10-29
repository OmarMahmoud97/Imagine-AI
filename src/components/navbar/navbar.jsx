import "./navbar.scss";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
const NavPage = () => (
  <nav className="nav">
    <ul className="nav__container">
      <Link to="/">
        <img src={logo} alt="logo" className="nav__logo" />
      </Link>

      <div className="nav__links">
        <li className="nav__dropdown nav__dropdown-first">
          Book
          <ul class="dropdown">
            <li className="nav__dropdown">Flights</li>
            <li className="nav__dropdown">Hotels</li>
            <li className="nav__dropdown">Restaurants</li>
          </ul>
        </li>
        <Link to="/translate" className="results__btn-right">
          <li className="nav__item">Translation</li>
        </Link>
        <li className="nav__item">Chat Log</li>
        <li className="nav__item">Blog</li>
        <button className="nav__login">Login</button>
      </div>
    </ul>
  </nav>
);
export default NavPage;
