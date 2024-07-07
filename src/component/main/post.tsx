import React from "react";
import getApiSearch from "../api/getApiSearch";
import { StarWarsEntity } from "../api/dataInterface";
import { ResultType } from "../api/dataInterface";
import "../../../public/css/main/container.css";

interface PostState {
  posts: StarWarsEntity[];
  isLoading: boolean;
}

export default class Post extends React.Component<{}, PostState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      posts: [],
      isLoading: false, 
    };
  }

  async componentDidMount() {
    window.addEventListener("searchEvent", this.handleSearchEvent);
    this.setState({ isLoading: true });
    const postsData = await getApiSearch();
    this.setState({ posts: postsData, isLoading: false });
  }

  handleSearchEvent = async () => {
    this.setState({ isLoading: true });
    const postsData = await getApiSearch();
    this.setState({ posts: postsData, isLoading: false });
  };

  getValue<T extends keyof ResultType>(
    result: ResultType,
    key: T,
  ): string | string[] {
    return String(result[key]);
  }

  render(): React.ReactNode {
    const { posts, isLoading } = this.state;

    if (isLoading) {
      return <div className="loading" id="loading"></div>;
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
                  {key}: {String(this.getValue(result, key))}
                </div>
              ))}
            </div>
          ));
        }
        return null;
      });

      return <div className="results" id="results">{postsDiv}</div>;
    }
    return null;
  }
}
