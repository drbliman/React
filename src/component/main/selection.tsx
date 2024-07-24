import React from "react";
import { useDispatch } from 'react-redux';
import { useTheme } from "../ThemeContext";
import { useGetEntityDetailsQuery } from "../api/starWarsApiSlice";
import { addElement } from "../store/store";
import { StarWarsEntity } from "../api/dataInterface";
import store from "../store/store";

interface SelectionProps {
  id: string;
}

const Selection = (props: SelectionProps) => {
  const { id } = props;
  const { theme } = useTheme();
  const idParameters = id.split('_');
  const dispatch = useDispatch();

  const { data: postsData } = useGetEntityDetailsQuery({
    root: String(idParameters[0]),
    id: String(idParameters[1]),
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget instanceof HTMLElement) {
      event.currentTarget.classList.toggle('active');
      if (postsData) {
        if (event.currentTarget.className.includes('active')) {
          dispatch(addElement(postsData as StarWarsEntity));
          console.log(store.getState().elements);
        }
      }
    }
  };

  return <div
    className= {`selection ${theme}`}
    id={ id }
    onClick={handleClick}
  ></div>
}

export default Selection;