import React from "react";
import "../../../public/css/header/button.css";

interface ButtonProps {
  className?: string;
  textContent?: string;
}

export class Button extends React.Component<ButtonProps> {
  render(): React.ReactNode {
    const { className } = this.props;
    const { textContent } = this.props;

    const customEvent = className === 'buttonSearch' ? "searchEvent" : 'errorEvent';

    const handleClick = () => {
      const event = new CustomEvent(customEvent);
      window.dispatchEvent(event);
    };

    return (
      <button className={className} id={className} onClick={handleClick}>
        {textContent}
      </button>
    );
  }
}
