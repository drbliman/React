import React from "react";
import "../../../public/css/header/inputs.css";

type Props = {
  className: string;
  placeholder: string;
};

const Input = (props: Props) => {
  const [state, setState] = React.useState(String(localStorage.getItem("search")) || "Skywalker");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
    localStorage.setItem("search", `${event.target.value}`);
  };

  const { className } = props;
  const { placeholder } = props;

  return (
    <input
      className={className}
      id={className}
      placeholder={placeholder}
      value={state}
      onChange={handleInputChange}
    ></input>
  );
}

export default Input;