import React from "react";
import "../../../public/css/header/button.css";

interface ButtonProps {
  className?: string;
  textContent?: string;
}

export default class Button extends React.Component<ButtonProps> {
  render(): React.ReactNode {
    const handleClick = () => {
      const event = new CustomEvent("searchEvent");
      window.dispatchEvent(event);
    };
    const { className } = this.props;
    const { textContent } = this.props;
    return (
      <button className={className} id={className} onClick={handleClick}>
        {textContent}
      </button>
    );
  }
}
