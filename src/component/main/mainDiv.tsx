import React from "react";
import Post from "./post";
import "../../../public/css/main/main.css";

export default class Main extends React.Component {
  render(): React.ReactNode {
    return (
      <main className="main" id="main">
        <Post></Post>
      </main>
    );
  }
}
