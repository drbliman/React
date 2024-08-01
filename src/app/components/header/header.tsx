"use client";

import React from "react";
import { useTheme } from "../themeContext";
import Input from "./input/input";
import Button from "./button/button";
import SearchIn from "./searchIn/searchIn";
import "./header.scss";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  if (!localStorage.getItem("search")) {
    localStorage.setItem("search", "skywalker");
  }

  return (
    <>
      <header className={`header ${theme}`} id="header">
        <div className="headerContainer" id="headerContainer">
          <Input className={`inputSearch ${theme}`} placeholder="Search..." />
          <Button
            className={`buttonSearch ${theme}`}
            textContent="Search"
          ></Button>
          <Button
            className={`buttonError ${theme}`}
            textContent="Error"
          ></Button>
          <button
            className={`buttonTheme ${theme}`}
            id="buttonTheme"
            onClick={toggleTheme}
          ></button>
        </div>
        <SearchIn></SearchIn>
      </header>
    </>
  );
};

export default Header;
