import React from "react";
import Sidebar2 from "./Sidebar2";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/toggleMode.css";

const Header = ({user}) => {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "light");

  const toggleMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "dark" ? "light" : "dark";
      localStorage.setItem("mode", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    document.body.className = mode;
  }, [mode]);

  return (
    <>
      {/* <Sidebar /> */}
      <Sidebar2 user={user}/>

      <div className="header flex items-center justify-between h-16 px-4 mb-1 top-0">
        <div className="logo-holder m-auto">
          <Link to="/">
            <img
              className="logo-img object-cover"
              src="/media/images/dpc-logo.png"
              alt="logo"
            />
          </Link>
        </div>

        {/* dark and light mode toggle ----------set display inline-block----------*/}
          <div className="relative  align-middle select-none transition duration-200 ease-in hidden">
            <input
              type="checkbox"
              name="toggle"
              id="toggle"
              className="toggle-checkbox absolute block rounded-full appearance-none cursor-pointer"
              checked={mode === "dark"}
              onChange={toggleMode}
            />
            <label
              htmlFor="toggle"
              className="toggle-label block overflow-hidden rounded-full cursor-pointer"
            ></label>
          </div>
      </div>
    </>
  );
};

export default Header;
