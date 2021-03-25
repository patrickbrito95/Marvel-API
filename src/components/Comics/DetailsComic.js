import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const Title = styled.h1`
  color: white;
`;

const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: bold;
  text-decoration: none;
`;

const BackButton = styled(Link)`
  cursor: pointer;
  background-color: red;
  border: none;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  margin-bottom: 30px;
`;

const md5 = require("md5");

const timeStamp = Date.now().toString();

const hash = md5(
  timeStamp +
    process.env.REACT_APP_API_KEY +
    process.env.REACT_APP_PUBLIC_API_KEY
);

const api_key = `?ts=${timeStamp}&apikey=${process.env.REACT_APP_PUBLIC_API_KEY}&hash=${hash}`;
const url = "https://gateway.marvel.com/v1/public/characters/";
const url_c = "https://gateway.marvel.com/v1/public/comics/";

class tr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      character: null,
      positionComic: props.match.params.idComic,
      cover: null,
    };
    this.id = props.match.params.id;
    this.recovercharacter(this.id);
  }
  async recovercharacter(id) {
    let pers = await axios.get(url + id + api_key);
    this.setState({ character: pers });
    this.recoverComic();
  }
  async recoverComic() {
    let c = this.state.character.data.data.results[0].comics.items[
      this.state.positionComic
    ].resourceURI;
    let array = c.split("/");
    let comidId = array[array.length - 1];
    let com = await axios.get(url_c + comidId + api_key);
    this.setState({ cover: com });
  }
  cutId(url) {
    let arr = url.split("/");
    return arr[arr.length - 1];
  }
  render() {
    if (this.state.character == null || this.state.cover == null) {
      return <h1>Working on...</h1>;
    } else {
      return (
        <Container>
          <img
            src={
              this.state.cover.data.data.results[0].images[0].path +
              "." +
              this.state.cover.data.data.results[0].images[0].extension
            }
            alt={
              this.state.character.data.data.results[0].comics.items[
                this.state.positionComic
              ].name + "Image"
            }
          />
          <Title>
            {
              this.state.character.data.data.results[0].comics.items[
                this.state.positionComic
              ].name
            }
          </Title>
          <p>
            {" "}
            {
              this.state.character.data.data.results[0].comics.items[
                this.state.positionComic
              ].description
            }{" "}
          </p>

          <Title>Characters</Title>

          {this.state.cover.data.data.results[0].characters.items.length !==
          0 ? (
            this.state.cover.data.data.results[0].characters.items.map((a) => (
              <StyledLink
                to={"/result/character/ch/" + this.cutId(a.resourceURI)}
              >
                {a.name}
              </StyledLink>
            ))
          ) : (
            <p>Unknow Characters</p>
          )}
          <br />
          <BackButton to="/">back</BackButton>
        </Container>
      );
    }
  }
}

export default tr;
