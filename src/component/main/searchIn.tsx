import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import "../../../public/css/header/searchIn.scss";

const SearchIn = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

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
    if (selectedIndex === -1) {
      setSelectedIndex(0);
    }
  }, [selectedIndex, navigate]);

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
