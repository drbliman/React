import React from "react";
import getApiSearch from "../api/getApiSearch";
import { StarWarsEntity } from "../api/dataInterface";
import { ResultType } from "../api/dataInterface";
import "../../../public/css/main/container.css";

const Post = () => {
  let postState: StarWarsEntity[] = [];

  const [state, setState]  = React.useState({
    posts: postState,
    isLoading: false,
  });

  const handleSearchEvent = async () => {
    setState({ posts: [], isLoading: true });
    const postsData = await getApiSearch();
    setState({ posts: postsData, isLoading: false });
  };

  React.useEffect(() => {
    handleSearchEvent();
    
    window.addEventListener("searchEvent", handleSearchEvent);
    return () => {
      window.removeEventListener("searchEvent", handleSearchEvent);
    };
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

  let allResultsEmpty = true;

  for (const elem of posts) {
    if (elem.results.length > 0) {
      allResultsEmpty = false;
      break;
    }
  }

  if (allResultsEmpty) {
    return <h1>Oops, looks like nothing was found</h1>;
  }

  if (posts.length > 0) {
    const postsDiv = posts.map((elem, index) => {
      if (elem.results.length > 0) {
        return elem.results.map((result, resultIndex) => (
          <div className="resultContainer" key={`${index}-${resultIndex}`}>
            {(Object.keys(result) as (keyof ResultType)[]).map((key) => (
              <div
                className="lincNavBar"
                key={`${index}-${resultIndex}-${key}`}
              >
                {key}: {String(getValue(result, key))}
              </div>
            ))}
          </div>
        ));
      }
      return null;
    });

    return (
      <div className="results" id="results">
        {postsDiv}
      </div>
    );
  }

  return null;
}

export default Post;