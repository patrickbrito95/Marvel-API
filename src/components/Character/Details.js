import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const md5 = require("md5");

const timeStamp = Date.now().toString();

const hash = md5(
  timeStamp +
    process.env.REACT_APP_API_KEY +
    process.env.REACT_APP_PUBLIC_API_KEY
);

const Title = styled.h1`
  color: white;
`;

const Subtitle = styled.h2`
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

const Card = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      character: null,
    };
    this.characterId = props.match.params.id;
    this.url = "https://gateway.marvel.com/v1/public/characters/";
    this.api_key = `?ts=${timeStamp}&apikey=${process.env.REACT_APP_PUBLIC_API_KEY}&hash=${hash}`;
    this.fetchCharacter();
  }

  async fetchCharacter() {
    let char = await Axios.get(this.url + this.characterId + this.api_key);
    console.log(char.data.data.results[0]);
    this.setState({ character: char.data.data.results[0] });
  }
  render() {
    if (this.state.character == null) {
      return <Title>Loading...</Title>;
    } else {
      return (
        <Card>
          <Title>{this.state.character.name}</Title>
          <img
            src={
              this.state.character.thumbnail.path +
              "." +
              this.state.character.thumbnail.extension
            }
            alt={this.state.character.name + "Image"}
          />
          {this.state.character.description ? (
            <Subtitle>{this.state.character.description}</Subtitle>
          ) : (
            <Title>No Description</Title>
          )}
          <Subtitle>Features</Subtitle>
          {this.state.character.comics.items.map((c, index) => {
            return (
              <>
                <StyledLink
                  to={"/" + this.characterId + "/" + index}
                  key={index}
                >
                  {c.name}
                </StyledLink>
                <br />
              </>
            );
          })}
          <BackButton to="/">back</BackButton>
        </Card>
      );
    }
  }
}
export default Detail;
