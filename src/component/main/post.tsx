import React from "react";
import getApiSearch from "../api/getApiSearch";
import { StarWarsEntity } from "../api/dataInterface";

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
    const postsData = await getApiSearch();
    this.setState({ posts: postsData });
  }

  render(): React.ReactNode {
    
    const { posts } = this.state;
    if(posts.length > 0) {
      console.log(posts[0].results[0]);

      return <div>{ String(posts[0].results[0]) }</div>
    }
  }
}