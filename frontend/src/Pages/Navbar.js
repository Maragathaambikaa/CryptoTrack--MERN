import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../firebase/auth";
import { FaSun, FaMoon, FaTimes, FaBars } from "react-icons/fa";
import { BsCalculator } from "react-icons/bs";
import ConversionCalculator from "../Pages/ConversionCalculator";
import "./Navbar.css";

const Navbar = ({ user, darkMode, setDarkMode }) => {
  const [showEmail, setShowEmail] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // To get the current route

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  const toggleDarkMode = () => {
    // Disable dark mode for the landing page
    if (location.pathname !== "/") {
      setDarkMode(!darkMode);
    }
  };

  const toggleEmailVisibility = () => {
    setShowEmail(!showEmail);
  };

  const toggleCalculator = () => {
    setShowCalculator(!showCalculator);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    // Reset dark mode on landing page to prevent styling conflicts
    if (location.pathname === "/") {
      setDarkMode(false);
    }
  }, [location, setDarkMode]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-container">
          {/* Sidebar Toggle Button */}
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <FaBars size={20} />
          </button>

          {/* Logo */}
          <Link to="/" className="navbar-logo">
            CryptoTrack
          </Link>

          <div className="nav-right">
            {/* Converter Button */}
            <button onClick={toggleCalculator} className="navbar-link calculator-btn">
              <BsCalculator size={18} /> Converter
            </button>

            {/* Dark Mode Toggle */}
            <div className="dark-mode-toggle" onClick={toggleDarkMode}>
              {darkMode ? <FaMoon size={20} /> : <FaSun size={20} />}
            </div>

            {/* Auth Buttons */}
            {!user ? (
              <>
                <Link to="/login" className="navbar-link">Login</Link>
                <Link to="/signup" className="navbar-link">Signup</Link>
              </>
            ) : (
              <div className="profile" onClick={toggleEmailVisibility}>
                <img src={user.photoURL || 'default-profile-image-url'} alt="Profile" className="profile-image" />
                {showEmail && (
                  <div className="email-dropdown">
                    <span>{user.email}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* SIDEBAR */}
      <div className={`sidebar ${showSidebar ? "show-sidebar" : ""}`}>
        <button className="close-sidebar" onClick={toggleSidebar}>
          <FaTimes size={20} />
        </button>
        <ul>
          <li><Link to="/" onClick={toggleSidebar}>Home</Link></li>
          <li><Link to="/news" onClick={toggleSidebar}>News</Link></li>
          <li><Link to="/portfolio" onClick={toggleSidebar}>Portfolio</Link></li>
          {user && <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>}
        </ul>
      </div>

      {/* Conversion Calculator Modal */}
      {showCalculator && (
        <div className="calculator-fullscreen">
          <div className="calculator-content">
            <button className="close-btn" onClick={toggleCalculator}>
              <FaTimes size={22} />
            </button>
            <ConversionCalculator />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
