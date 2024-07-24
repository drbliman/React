import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StarWarsEntity } from "../api/dataInterface";
import { useTheme } from "../ThemeContext";
import { useGetEntityDetailsQuery } from "../api/starWarsApiSlice";
import "../../../public/css/main/details.scss";

const Details = () => {
  const { theme } = useTheme();
  const { root, search, idPage, idDetails } = useParams();
  const navigate = useNavigate();
  let postState: StarWarsEntity = {};

  const [state, setState] = React.useState({
    posts: postState,
    isLoading: false,
  });

  const { data: postsData } = useGetEntityDetailsQuery({
    root: String(root),
    id: String(idDetails?.split("_")[1]),
  });

  const divRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setState({ posts: {}, isLoading: true });
      console.log({ data: postsData });
      if (postsData) {
        setState({ posts: postsData, isLoading: false });
      }
    };

    fetchData();

    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        handleRemoveDetails();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
  }, [root, idDetails, postsData]);

  const handleRemoveDetails = () => {
    const baseUrl = `/main/${root}/${search}/page/${idPage}`;
    navigate(baseUrl);
  };

  const { posts, isLoading } = state;

  if (isLoading) {
    return (
      <div className="resultContainerBody">
        <div className={`loadingDetails ${theme}`} id="loading"></div>
      </div>
    );
  }

  return (
    <div className="resultContainerBody">
      <div className="close" onClick={handleRemoveDetails}></div>
      <div
        className={`resultContainerDetails ${theme}`}
        key={`${posts}`}
        ref={divRef}
      >
        {(Object.keys(posts) as (keyof StarWarsEntity)[]).map((key) => (
          <div className={`lincNavBar ${theme}`} key={`${key}`}>
            {key}: {String(posts[key])}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
