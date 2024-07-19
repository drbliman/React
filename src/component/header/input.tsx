import React from "react";
import { useParams } from "react-router-dom";
import "../../../public/css/header/inputs.scss";

type Props = {
  className: string;
  placeholder: string;
};

const Input = (props: Props) => {
  const { search } = useParams();
  let searchInput = String(localStorage.getItem("search") || "");

  if (search !== localStorage.getItem("search") && search !== undefined) {
    searchInput = String(search);
  }

  const [state, setState] = React.useState(searchInput || "");

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
};

export default Input;
