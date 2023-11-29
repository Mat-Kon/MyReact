import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="links">
          <li className="links__item">
            <NavLink to={'/uncontrolled'}>Uncontrolled</NavLink>
          </li>
          <li className="links__item">
            <NavLink to={'/'}>Main</NavLink>
          </li>
          <li className="links__item">
            <NavLink to={'/controlled'}>Controlled</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;