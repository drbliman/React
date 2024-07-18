import React from "react";
import { getApiSearch } from "../api/getApiSearch";
import { StarWarsEntity } from "../api/dataInterface";
import { useParams, useNavigate, Link } from "react-router-dom";
import PageLinc from "./pageLink";
import "../../../public/css/main/container.css";

type ResultType = {
  name?: string;
  title?: string;
};

const Post = () => {
  let postState: StarWarsEntity = {};
  let firstBoot = true;

  const [state, setState] = React.useState({
    posts: postState,
    isLoading: false,
  });

  const { root, search, idPage } = useParams();
  const navigate = useNavigate();

  const handleSearchEvent = async () => {
    if (firstBoot) {
      navigate(`/main/${root}/${search}/page/${idPage}`);
      localStorage.setItem("search", String(search));
    } else {
      const searchIn = document.querySelectorAll("a.searchIn");
      searchIn.forEach((elem) => {
        if (elem.className.includes("active")) {
          navigate(
            `/main/${elem.textContent}/${localStorage.getItem("search")}/page/${idPage}`,
          );
        }
      });
    }
    firstBoot = false;
    setState({ posts: {}, isLoading: true });
    const postsData = await getApiSearch(
      String(root),
      String(idPage),
      "search",
    );
    setState({ posts: postsData, isLoading: false });
  };

  React.useEffect(() => {
    handleSearchEvent();
  }, [root, idPage]);

  React.useEffect(() => {
    window.addEventListener("searchEvent", handleSearchEvent);
    return () => {
      window.removeEventListener('searchEvent', handleSearchEvent);
    };
  }, []);

  const { posts, isLoading } = state;

  if (isLoading) {
    return <div className="loading" id="loading" data-testid="loading"></div>;
  }

  if (posts && posts.results && posts.results.length < 1) {
    return <h1>Oops, looks like nothing was found</h1>;
  }

  if (posts === null) {
    navigate(`/main/${root}/${search}/page/1`);
    setState({ posts: {}, isLoading: true });
  }

  if (posts && posts.results && posts.results.length > 0) {
    const postsDiv = posts.results.map((elem, index) => {
      const arrNumberPost = elem?.url?.split("/");
      const numberPost = arrNumberPost
        ? arrNumberPost[arrNumberPost.length - 2]
        : undefined;
      return (
        <div className="resultContainer" key={`${index}-${index}`}>
          <Link
            to={`details/${root}_${numberPost}`}
            className="lincNavBar"
            key={`${index}-${index}-${elem}`}
          >
            {elem.name
              ? elem.name
              : (elem as ResultType).title
                ? (elem as ResultType).title
                : ""}
          </Link>
        </div>
      );
    });
    let pagination = false;
    if (posts && posts.count && posts.count > 10) {
      pagination = true;
    }
    return (
      <div className="results" id="results">
        {postsDiv}
        {pagination ? (
          <PageLinc num={posts.count || 1}></PageLinc>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
  return null;
};

export default Post;
