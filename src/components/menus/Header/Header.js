import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Header.css";
import icons from "../../../assets/images/icon";
import { menuItems } from "../menuItems.js";

// A reusable MenuItem component for rendering menu items
const MenuItem = ({ item }) => {
  return (
    <div className={`${item.move ? "mobile-link" : ""}`}>
      <NavLink to={item.path} aria-label={item.label}>
        <div>{item.text}</div>
        <img
          src={icons[item.icon]}
          alt={`${item.text} Icon`}
          className="icon"
          width="32"
          height="32"
        />
      </NavLink>
    </div>
  );
};

// Helper function to start a timer
const startTimer = (timerRef, action, delay) => {
  timerRef.current = setTimeout(action, delay);
};

// Helper function to clear a timer
const clearTimer = (timerRef) => {
  clearTimeout(timerRef.current);
};

// The Header component responsible for rendering the site navigation
function Header() {
  // State management for dropdown open/close and click availability
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isClickEnabled, setIsClickEnabled] = useState(true);

  // For detecting navigation changes
  const location = useLocation();

  // Filtering menuItems to exclude Home item and storing the result
  const filteredMenuItems = menuItems.filter((item) => item.text !== "Home");

  // Refs for the dropdown and timer management
  const dropdownRef = useRef(null);
  const closeTimerRef = useRef(null);
  const openTimerRef = useRef(null);
  const clickEnableTimerRef = useRef(null);

  // Effect for handling clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Effect to handle enabling click after dropdown is open
  useEffect(() => {
    if (isDropdownOpen) {
      startTimer(
        clickEnableTimerRef,
        () => {
          setIsClickEnabled(true);
        },
        360
      );
    }
  }, [isDropdownOpen]);

  // Close dropdown when navigating
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  // Function to toggle dropdown open/close state
  const toggleDropdown = (event) => {
    if (isClickEnabled) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
    }
    event.preventDefault();
  };

  // Handlers for various mouse events related to dropdown
  const handleDropdownHover = () => {
    clearTimer(closeTimerRef);
    startTimer(
      openTimerRef,
      () => {
        setIsDropdownOpen(true);
        setIsClickEnabled(false);
      },
      180
    );
  };

  const handleDropdownFocus = () => {
    clearTimer(closeTimerRef);
    setIsDropdownOpen(true);
  };

  const handleDropdownBlur = () => {
    clearTimer(openTimerRef);
    clearTimer(closeTimerRef);
    startTimer(closeTimerRef, () => setIsDropdownOpen(false), 360);
  };

  return (
    <nav className="header">
      <NavLink to="/" className="link-logo">
        <picture>
          <source type="image/webp" srcSet="/img/logo400.webp" />
          <img
            src="/img/logo400.png"
            alt="Logo of BanjoDave"
            className="logo"
          />
        </picture>
      </NavLink>
      <a href="#maincontent" className="skip-link">
        Skip to main content
      </a>

      {/* Render main navigation links by filtering menu items */}
      {filteredMenuItems
        .filter((item) => item.move)
        .map((item) => (
          <NavLink
            key={item.text}
            to={item.path}
            aria-label={`Go to ${item.text} page`}
            className="link desktop-link"
          >
            {item.text}
          </NavLink>
        ))}

      {/* Render dropdown with remaining items */}
      <button
        ref={dropdownRef}
        className={`dropdown link${isDropdownOpen ? " open" : ""}`}
        onMouseEnter={handleDropdownHover}
        onMouseLeave={handleDropdownBlur}
        onFocus={handleDropdownFocus}
        onBlur={handleDropdownBlur}
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
        aria-label="Navigate to other pages"
      >
        <div onMouseDown={toggleDropdown} className="dropdown-link">
          <div>&#9776;</div>
        </div>
        <div className="dropdown-content">
          {filteredMenuItems.map((item) => (
            <MenuItem item={item} key={item.text} />
          ))}
        </div>
      </button>
    </nav>
  );
}

export default Header;
