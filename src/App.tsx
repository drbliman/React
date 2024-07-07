import React from "react";
import Header from "./component/header/header";
import Main from "./component/main/mainDiv";

export default class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Main />
      </>
    );
  }
}
