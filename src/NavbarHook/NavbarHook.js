import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import "./NavbarHook.css";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode as a named export

const NavbarHook = ({ setIsLoggedIn, setUserRole }) => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setLocalUserRole] = useState('');
  const isMobile = useMediaQuery({ maxWidth: "1150px" });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken); // Log decoded token to inspect its contents
        const userRole = decodedToken.role;
        console.log("role +++ ", userRole);
        setLocalUserRole(userRole);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:7000/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        console.log('User signed out successfully!');
        localStorage.removeItem('token'); // Remove the token from local storage
        setIsLoggedIn(false); // Update the isLoggedIn state
        setUserRole(''); // Reset the user role state in App
        setLocalUserRole(''); // Reset the local user role state in NavbarHook
        navigate('/logout');
      } else {
        console.error('Error signing out:', response.statusText);
      }
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const renderNavLinks = () => {
    const listClassName = isMobile ? "nav__list" : "nav__list__web";
    const linkClassName = "nav__link";
    const buttonClassName = "nav__cta";

    return (
      <ul className={listClassName}>
        {userRole === 'admin' && (
          <li className="nav__item">
            <NavLink to="/" className="nav__link" onClick={closeMobileMenu}>
               Dashboard
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to="/user-profile"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            myEnvirosense
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/logout"
            className={linkClassName}
            onClick={handleLogout}
          >
            Logout
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/get-started"
            className={`${linkClassName} ${buttonClassName}`}
            onClick={closeMobileMenu}
            id="getstarted"
          >
            GET STARTED
          </NavLink>
        </li>
      </ul>
    );
  };

  return (
    <header className="header">
      <nav className="nav">
        <NavLink to="/" className="nav__logo">
          ENVIROSENSE
        </NavLink>

        {isMobile && (
          <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
            <IoMenu />
          </div>
        )}

        {isMobile ? (
          <div
            className={`nav__menu ${isMenuOpen ? "show-menu" : ""}`}
            id="nav-menu"
          >
            {renderNavLinks()}
            <div className="nav__close" id="nav-close" onClick={toggleMenu}>
              <IoClose />
            </div>
          </div>
        ) : (
          renderNavLinks()
        )}
      </nav>
    </header>
  );
};

export default NavbarHook;
