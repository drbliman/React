import React from "react";
import getApiAll from "../api/getApiAll";
import "../../../public/css/header/navBar.css";

export default class NavBar extends React.Component {
  render(): React.ReactNode {
    const links: { [key: string]: string } = {
      people: "https://swapi.dev/api/people/",
      planets: "https://swapi.dev/api/planets/",
      films: "https://swapi.dev/api/films/",
      species: "https://swapi.dev/api/species/",
      vehicles: "https://swapi.dev/api/vehicles/",
      starships: "https://swapi.dev/api/starships/",
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const id = (event.currentTarget as HTMLDivElement).id;
      getApiAll(id);
    };

    const linkElements = Object.keys(links).map((key) => (
      <div
        className="lincNavBar"
        id={links[key]}
        key={key}
        onClick={handleClick}
      >
        {key}
      </div>
    ));

    return (
      <nav className="navBar" id="navBar">
        {linkElements}
      </nav>
    );
  }
}
