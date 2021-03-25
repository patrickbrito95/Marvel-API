import React from "react";
import Axios from "axios";
import Comic from "./Comic";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

const Parag = styled.p`
  font-family: "Marvel", sans-serif;
`;

const md5 = require("md5");

const timeStamp = Date.now().toString();

const hash = md5(
  timeStamp +
    process.env.REACT_APP_API_KEY +
    process.env.REACT_APP_PUBLIC_API_KEY
);

class Comics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comics: [],
      call: 0,
    };
    this.api_key = `?ts=${timeStamp}&apikey=${process.env.REACT_APP_PUBLIC_API_KEY}&hash=${hash}&limit=20&offset=`;
    this.url_key = "https://gateway.marvel.com:443/v1/public/comics";
    this.recuperaComics();
  }

  async recuperaComics() {
    let c = await Axios.get(this.url_key + this.api_key + this.state.call);
    this.setState({ comics: [...this.state.comics, ...c.data.data.results] });
    this.setState({ call: Number(this.state.call) + 20 });
  }
  render() {
    if (this.state.comics == null) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <InfiniteScroll
          dataLength={this.state.comics.length}
          next={() => this.recuperaComics()}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <Parag style={{ textAlign: "center" }}>
              <b>Wooow!! You have seen it all...</b>
            </Parag>
          }
        >
          <Container>
            {this.state.comics.map((a) => (
              <Container>
                {" "}
                <Comic {...a}></Comic>{" "}
              </Container>
            ))}
          </Container>
        </InfiniteScroll>
      );
    }
  }
}

export default Comics;
