import React from "react";
import "../../../public/css/header/inputs.css";

interface InputProps {
  className?: string;
  placeholder?: string;
}

type Props = {
  className: string;
  placeholder: string;
};

type State = {
  inputValue: string;
};

export default class Input extends React.Component<InputProps, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: String(localStorage.getItem("search")) || "Skywalker",
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
    localStorage.setItem("search", `${event.target.value}`);
  };

  render(): React.ReactNode {
    const { className } = this.props;
    const { placeholder } = this.props;
    const { inputValue } = this.state;
    return (
      <input
        className={className}
        id={className}
        placeholder={placeholder}
        value={inputValue}
        onChange={this.handleInputChange}
      ></input>
    );
  }
}
