"use client";

import React from "react";
import { useTheme } from "../themeContext";

const Main = () => {
    const { theme } = useTheme();
  
    return (
      <main className={`main ${theme}`} id="main">
        {/* <Outlet></Outlet> */}
        {/* <Post></Post> */}
        {/* <PopUpDownload></PopUpDownload> */}
      </main>
    );
  };
  
  export default Main;