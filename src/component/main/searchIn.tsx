import React from "react";
import { useParams, Link } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import "../../../public/css/header/searchIn.scss";

const SearchIn = () => {
  const { theme } = useTheme();

  const arrButton = [
    "people",
    "planets",
    "films",
    "species",
    "vehicles",
    "starships",
  ];
  const { root } = useParams();

  const [selectedIndex, setSelectedIndex] = React.useState(
    arrButton.indexOf(String(root)),
  );

  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };

  React.useEffect(() => {
    const event = new CustomEvent("searchInEvent");
    window.dispatchEvent(event);
  }, [selectedIndex]);

  return (
    <div className="searchInContainer">
      {arrButton.map((_, index) => (
        <Link
          to={`/main/${arrButton[index]}/${localStorage.getItem("search")}/page/1`}
          key={arrButton[index]}
          className={`searchIn ${theme}${selectedIndex === index ? " active" : ""}`}
          onClick={() => handleClick(index)}
        >
          {arrButton[index]}
        </Link>
      ))}
    </div>
  );
};

export default SearchIn;
