import React from "react";
import Character from "./Character";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const md5 = require("md5");

const timeStamp = Date.now().toString();

const hash = md5(
  timeStamp +
    process.env.REACT_APP_API_KEY +
    process.env.REACT_APP_PUBLIC_API_KEY
);

class Characters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayCharacters: [],
      call: 0,
    };
    this.api_key = `?ts=${timeStamp}&apikey=${process.env.REACT_APP_PUBLIC_API_KEY}&hash=${hash}&limit=20&offset=`;
    this.api_url = "https://gateway.marvel.com:443/v1/public/characters";

    this.fetchCharacters();
  }

  async fetchCharacters() {
    const loadCall = 20;
    let heroes = await axios.get(this.api_url + this.api_key + this.state.call);
    this.setState({
      arrayCharacters: [
        ...this.state.arrayCharacters,
        ...heroes.data.data.results,
      ],
    });
    this.setState({ call: Number(this.state.call) + loadCall });
  }
  render() {
    return (
      <InfiniteScroll
        dataLength={this.state.arrayCharacters.length}
        next={this.fetchCharacters.bind(this)}
        hasMore={true}
        loader={<h3>LOADING...</h3>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="container">
          {this.state.arrayCharacters.map((a, index) => (
            <Character key={index} {...a}></Character>
          ))}
        </div>
      </InfiniteScroll>
    );
  }
}
export default Characters;
