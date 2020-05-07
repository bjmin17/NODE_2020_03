import React from "react";
import { Link, NavLink } from "react-router-dom";

const MainNav = () => {
  return (
    <nav className="navbar navbar-expand bg-primary text-white">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/bbs" className="nav-link">
            BBs
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            로그인
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;
