import { Outlet } from "react-router-dom";
import Post from "./post";
import "../../../public/css/main/main.css";

const Main = () => (
  <main className="main" id="main">
    <Outlet></Outlet>
    <Post></Post>
  </main>
);

export default Main;
