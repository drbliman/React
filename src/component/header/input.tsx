import React from "react";
import "../../../public/css/header/inputs.css";

interface InputProps {
  className?: string;
  placeholder?: string;
}

export default class Input extends React.Component<InputProps> {
  render(): React.ReactNode {
    const { className } = this.props;
    const { placeholder } = this.props;
    return (
      <input
        className={className}
        id={className}
        placeholder={placeholder}
        value={String(localStorage.getItem('search'))}
      ></input>
    );
  }
}
