import React from "react";
import getApiSearch from "../api/getApiSearch";
import { StarWarsEntity } from "../api/dataInterface";
import { ResultType } from "../api/dataInterface";

interface PostState {
  posts: StarWarsEntity[];
}

export default class Post extends React.Component<{}, PostState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  async componentDidMount() {
    window.addEventListener('searchEvent', this.handleSearchEvent);
    const postsData = await getApiSearch();
    this.setState({ posts: postsData });
  }

  handleSearchEvent = async () => {
    const postsData = await getApiSearch();
    this.setState({ posts: postsData });
  };

  getValue<T extends keyof ResultType>(result: ResultType, key: T): string | string[] {
    return String(result[key]);
  }

  render(): React.ReactNode {
    const { posts } = this.state;
    if (posts.length > 0) {
      const postsDiv = posts.map((elem, index) => {
        if (elem.results.length > 0) {
          return elem.results.map((result, resultIndex) => (
            <div className="resultContainer" key={`${index}-${resultIndex}`}>
              {(Object.keys(result) as (keyof ResultType)[]).map((key) => (
                <div className="lincNavBar" key={`${index}-${resultIndex}-${key}`}>
                  {key}: {String(this.getValue(result, key))}
                </div>
              ))}
            </div>
          ));
        }
        return null;
      });

      return <div>{postsDiv}</div>;
    }
    return null;
  }
}
