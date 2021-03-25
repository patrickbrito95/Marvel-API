import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const Title = styled.h1`
  font-family: "Marvel", sans-serif;
  font-size: 2em;
  width: 50%;
  color: white;
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

class ComicDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comic: null,
    };
    this.url_c = "https://gateway.marvel.com/v1/public/comics/";
    this.api_key = `?ts=${timeStamp}&apikey=${process.env.REACT_APP_PUBLIC_API_KEY}&hash=${hash}`;
    this.idComic = props.match.params.id;
    this.recuperaComic(this.idComic);
  }
  async recuperaComic(idComic) {
    let com = await axios.get(this.url_c + idComic + this.api_key);
    console.log(com.data.data.results[0]);
    this.setState({ comic: com.data.data.results[0] });
  }
  recortaId(url) {
    let arr = url.split("/");
    return arr[arr.length - 1];
  }

  render() {
    if (this.state.comic == null) {
      return <h1>Getting comic...</h1>;
    }
    return (
      <Card>
        <img
          src={this.state.comic.thumbnail.path + ".jpg"}
          alt="Comic Thumbnail"
        />
        <Title>{this.state.comic.title}</Title>
        <Parag>{this.state.comic.description}</Parag>
        <Title>Characters</Title>
        <ul>
          {this.state.comic.characters.items.length !== 0 ? (
            this.state.comic.characters.items.map((a) => (
              <Link
                to={"/result/character/ch/" + this.recortaId(a.resourceURI)}
              >
                {a.name}
              </Link>
            ))
          ) : (
            <Parag>Unknow Characters</Parag>
          )}
        </ul>
      </Card>
    );
  }
}
export default ComicDetails;
