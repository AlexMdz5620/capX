import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>CapX</h1>
      <nav>
        <NavLink to={"/"} className={"links"}>
          Home
        </NavLink>
        <NavLink to={"/login"} className={"links"}>
          Login
        </NavLink>
        <NavLink to={"/register"} className={"links"}>
          Register
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
