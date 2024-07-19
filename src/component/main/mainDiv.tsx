import { Outlet } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import Post from "./post";
import "../../../public/css/main/main.scss";

const Main = () => {
  const { theme } = useTheme();
  return <main className={`main ${theme}`} id="main">
    <Outlet></Outlet>
    <Post></Post>
  </main>
};

export default Main;
