import React from "react";
import "../../../public/css/header/button.css";
import getApi from "../api/getApi";

interface ButtonProps {
  className?: string;
  textContent?: string;
}

export default class Button extends React.Component<ButtonProps> {
  render(): React.ReactNode {
    const { className } = this.props;
    const { textContent } = this.props;
    return (
      <button className={className} id={className} onClick={getApi}>
        {textContent}
      </button>
    );
  }
}
