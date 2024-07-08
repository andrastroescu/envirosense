import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="">
      <nav className="nav">
        <NavLink to="/" className="nav__logo" id="">
          ENVIROSENSE
        </NavLink>
   </nav>
    </header>
  );
};

export default Navbar;