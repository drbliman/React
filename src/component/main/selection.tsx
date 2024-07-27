import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../ThemeContext";
import { useGetEntityDetailsQuery } from "../api/starWarsApiSlice";
import { addElement, removeElement } from "../store/store";
import { ResultType } from "../api/dataInterface";

interface SelectionProps {
  id: string;
}

const Selection = (props: SelectionProps) => {
  const { id } = props;
  const { theme } = useTheme();
  const idParameters = id.split("_");
  const dispatch = useDispatch();

  const { data: postsData } = useGetEntityDetailsQuery({
    root: String(idParameters[0]),
    id: String(idParameters[1]),
  });

  const elements = useSelector((state: any) => state.elements);

  const [activeClass, setActiveClass] = React.useState(false);

  React.useEffect(() => {
    let isActive = false;
    elements.forEach((elem: ResultType) => {
      if (elem.url?.includes(`${idParameters[0]}/${idParameters[1]}`)) {
        isActive = true;
      }
    });
    setActiveClass(isActive);
  }, [elements, idParameters]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget instanceof HTMLElement) {
      event.currentTarget.classList.toggle("active");
      if (postsData) {
        if (event.currentTarget.className.includes("active")) {
          dispatch(addElement(postsData as ResultType));
        } else {
          dispatch(removeElement(postsData as ResultType));
        }
      }
    }
  };

  return (
    <div
      className={`selection ${theme} ${activeClass ? "active" : ""}`}
      id={id}
      onClick={handleClick}
      key={id}
    ></div>
  );
};

export default Selection;
