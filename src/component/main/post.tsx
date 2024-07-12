import React from "react";
import getApiSearch from "../api/getApiSearch";
import { StarWarsEntity } from "../api/dataInterface";
import { ResultType } from "../api/dataInterface";
import { useParams } from "react-router-dom";
import "../../../public/css/main/container.css";

const Post = () => {
  let postState: StarWarsEntity = {};

  const [state, setState] = React.useState({
    posts: postState,
    isLoading: false,
  });

  const { root } = useParams();

  const handleSearchEvent = async () => {
    setState({ posts: {}, isLoading: true });
    const postsData = await getApiSearch(String(root));
    setState({ posts: postsData, isLoading: false });
  };

  React.useEffect(() => {
    handleSearchEvent();
  }, [root]);

  React.useEffect(() => {
    handleSearchEvent();
    window.addEventListener("searchEvent", handleSearchEvent);
  }, []);

  function getValue<T extends keyof ResultType>(
    result: ResultType,
    key: T,
  ): string | string[] {
    return String(result[key]);
  }

  const { posts, isLoading } = state;

  if (isLoading) {
    return <div className="loading" id="loading"></div>;
  }

  if (posts && posts.results && posts.results.length < 1) {
    return <h1>Oops, looks like nothing was found</h1>;
  }

  if (posts && posts.results && posts.results.length > 0) {
    const postsDiv = posts.results.map((elem, index) => (
      <div className="resultContainer" key={`${index}-${index}`}>
        {(Object.keys(elem) as (keyof ResultType)[]).map((key) => (
          <div className="lincNavBar" key={`${index}-${index}-${key}`}>
            {key}: {String(getValue(elem, key))}
          </div>
        ))}
      </div>
    ));
    return (
      <div className="results" id="results">
        {postsDiv}
      </div>
    );
  }
  return null;
};

export default Post;
