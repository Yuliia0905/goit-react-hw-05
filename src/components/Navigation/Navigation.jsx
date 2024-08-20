import { NavLink } from "react-router-dom";
import { BiSolidMoviePlay } from "react-icons/bi";

import css from "./Navigation.module.css";
import clsx from "clsx";

const Navigation = () => {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <NavLink
          className={({ isActive }) => clsx(css.link, isActive && css.active)}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => clsx(css.link, isActive && css.active)}
          to="/movies"
        >
          Movies
        </NavLink>
        <BiSolidMoviePlay size="36" className={css.logo} />
      </nav>
    </header>
  );
};

export default Navigation;
