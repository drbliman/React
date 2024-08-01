"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import React from "react";
import { useTheme } from "../../themeContext";
import "./searchIn.scss";

const SearchIn = () => {
  const { theme } = useTheme();
  const { root } = useParams();

  const arrButton = [
    "people",
    "planets",
    "films",
    "species",
    "vehicles",
    "starships",
  ];

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
  }, [selectedIndex]);

  return (
    <div className="searchInContainer">
      {arrButton.map((_, index) => (
        <Link
          href={`/main/${arrButton[index]}/${localStorage.getItem("search")}/page/1`}
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
