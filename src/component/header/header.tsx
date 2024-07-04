import React from "react";
import Input from "./input";
import Button from "./button";
import "../../../public/css/header/header.css";

export default class Header extends React.Component {
  render(): React.ReactNode {
    return (
      <>
        <header className="header" id="header">
          <Input className="inputSearch" placeholder="Search..." />
          <Button className="buttonSearch" textContent="Search"></Button>
        </header>
      </>
    );
  }
}
