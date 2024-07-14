import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StarWarsEntity } from "../api/dataInterface";
import { getApiSearch } from "../api/getApiSearch";
import "../../../public/css/main/details.css";

const Details = () => {
  const { root, search, idPage, idDetails } = useParams();
  const searchIdDetails = React.useMemo(
    () => idDetails?.split("_"),
    [idDetails],
  );
  const navigate = useNavigate();
  let postState: StarWarsEntity = {};

  const [state, setState] = React.useState({
    posts: postState,
    isLoading: false,
  });

  const divRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setState({ posts: {}, isLoading: true });
      const postsData = await getApiSearch(
        String(root),
        String(searchIdDetails ? searchIdDetails[1] : ""),
        "details",
      );
      setState({ posts: postsData, isLoading: false });
    };

    fetchData();

    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        handleRemoveDetails();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
  }, [root, searchIdDetails]);

  const handleRemoveDetails = () => {
    const baseUrl = `/main/${root}/${search}/page/${idPage}`;
    navigate(baseUrl);
  };

  const { posts, isLoading } = state;

  if (isLoading) {
    return (
      <div className="resultContainerBody">
        <div className="loadingDetails" id="loading"></div>
      </div>
    );
  }

  return (
    <div className="resultContainerBody">
      <div className="close" onClick={handleRemoveDetails}></div>
      <div className="resultContainerDetails" key={`${posts}`} ref={divRef}>
        {(Object.keys(posts) as (keyof StarWarsEntity)[]).map((key) => (
          <div className="lincNavBar" key={`${key}`}>
            {key}: {String(posts[key])}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
