import React from "react";
import { Link, useParams } from "react-router-dom";
import "../../../public/css/main/pageLink.css";

interface PageLincProps {
  num: number;
}

const PageLinc = (props: PageLincProps) => {
  const { num } = props;
  const quantityPage = Math.ceil(num / 10);
  const [activeElement, setActiveElement] = React.useState<string | null>(null);
  const arrQuantityPage = new Array(quantityPage).fill(null);
  const { idPage } = useParams();

  React.useEffect(() => {
    const searchIn = document.querySelectorAll("a.searchIn");
    searchIn.forEach((elem) => {
      if (elem.className.includes("active")) {
        setActiveElement(elem.textContent);
      }
    });
  }, []);

  const linkDiv = arrQuantityPage.map((_, index) => (
    <Link
      to={`/main/${activeElement}/${localStorage.getItem("search")}/page/${index + 1}`}
      key={`/main/${activeElement}/${localStorage.getItem("search")}/page/${index + 1}`}
      className={`pageLink${Number(idPage) === index + 1 ? " active" : ""}`}
    >
      {index + 1}
    </Link>
  ));
  return (
    <div className="pageLinkConteiner" key={"pageLinkConteiner"}>
      {linkDiv}
    </div>
  );
};

export default PageLinc;
