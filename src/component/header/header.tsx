import Input from "./input";
import Button from "./button";
import "../../../public/css/header/header.css";

const Header = () => (
  <>
    <header className="header" id="header">
      <Input className="inputSearch" placeholder="Search..." />
      <Button className="buttonSearch" textContent="Search"></Button>
      <Button className="buttonError" textContent="Error"></Button>
    </header>
  </>
)

export default Header;
