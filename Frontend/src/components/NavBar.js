import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import ReactContext from "../context/react-context";

const NavBar = () => {
  const reactCtx = useContext(ReactContext);
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          {reactCtx.loginState ? (
            <ul>
              <li>
                <NavLink to="/home" activeClassName={styles.active}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/form" activeClassName={styles.active}>
                  Submit an Activity
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" activeClassName={styles.active}>
                  Profile
                </NavLink>
              </li>
            </ul>
          ) : (
            <li>
              <NavLink to="/login" activeClassName={styles.active}>
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
