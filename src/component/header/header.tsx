import { Outlet } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import Input from "./input";
import Button from "./button";
import SearchIn from "../main/searchIn";
import "../../../public/css/header/header.css";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  
  return <>
    <header className="header" id="header">
      <div className="headerContainer" id="headerContainer">
        <Input className="inputSearch" placeholder="Search..." />
        <Button className="buttonSearch" textContent="Search"></Button>
        <Button className="buttonError" textContent="Error"></Button>
        <button className={ `buttonTheme ${theme}` }  id="buttonTheme" onClick={ toggleTheme }></button>
      </div>
      <SearchIn></SearchIn>
    </header>
    <Outlet></Outlet>
  </>
};

export default Header;
