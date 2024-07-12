import { Outlet } from "react-router-dom";
import Input from "./input";
import Button from "./button";
import SearchIn from "../main/searchIn";
import "../../../public/css/header/header.css";

const Header = () => (
  <>
    <header className="header" id="header">
      <div className="headerContainer" id="headerContainer">
        <Input className="inputSearch" placeholder="Search..." />
        <Button className="buttonSearch" textContent="Search"></Button>
        <Button className="buttonError" textContent="Error"></Button>
      </div>
      <SearchIn></SearchIn>
    </header>
    <Outlet></Outlet>
  </>
);

export default Header;
