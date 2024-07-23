import React from "react";
import { StarWarsEntity } from "../api/dataInterface";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import { useSearchEntitiesQuery } from "../api/starWarsApiSlice";
import PageLinc from "./pageLink";
import "../../../public/css/main/container.scss";

type ResultType = {
  name?: string;
  title?: string;
};

const Post = () => {
  const { theme } = useTheme();
  const { root, search, idPage } = useParams();
  const navigate = useNavigate();

  const [state, setState] = React.useState<{
    posts: StarWarsEntity | null;
    isLoading: boolean;
  }>({
    posts: null,
    isLoading: false,
  });

  let firstBoot = true;

  const { data: postsData, isLoading: isQueryLoading } = useSearchEntitiesQuery(
    {
      root: String(root),
      search: String(search),
      page: String(idPage || "1"),
    },
  );

  const handleSearchEvent = () => {
    if (firstBoot) {
      navigate(`/main/${root}/${search}/page/${idPage}`);
      localStorage.setItem("search", String(search));
      firstBoot = false;
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

    setState({ posts: null, isLoading: true });

    if (postsData) {
      setState({ posts: postsData, isLoading: false });
    }
  };

  React.useEffect(() => {
    handleSearchEvent();
  }, [root, search, idPage, postsData]);

  React.useEffect(() => {
    window.addEventListener("searchEvent", handleSearchEvent);
    return () => {
      window.removeEventListener("searchEvent", handleSearchEvent);
    };
  }, []);

  const { posts, isLoading } = state;

  if (isLoading || isQueryLoading) {
    return (
      <div
        className={`loading ${theme}`}
        id="loading"
        data-testid="loading"
      ></div>
    );
  }

  if (posts && posts.results && posts.results.length < 1) {
    return <h1>Oops, looks like nothing was found</h1>;
  }

  if (posts === null) {
    return null;
  }

  if (posts && posts.results && posts.results.length > 0) {
    const postsDiv = posts.results.map((elem, index) => {
      const arrNumberPost = elem?.url?.split("/");
      const numberPost = arrNumberPost
        ? arrNumberPost[arrNumberPost.length - 2]
        : undefined;
      return (
        <div className={`resultContainer ${theme}`} key={`${index}-${index}`}>
          <Link
            to={`details/${root}_${numberPost}`}
            className={`lincNavBar ${theme}`}
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
