import React from "react";
import axios from "axios";
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

class Char extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Char: null,
    };
    this.idChar = props.match.params.id;
    this.api_key = `?ts=${timeStamp}&apikey=${process.env.REACT_APP_PUBLIC_API_KEY}&hash=${hash}`;
    this.url = "https://gateway.marvel.com/v1/public/characters/";
    this.recoverChar(this.idChar);
  }
  async recoverChar(id) {
    let hero = await axios.get(this.url + id + this.api_key);
    this.setState({ Char: hero.data.data.results[0] });
  }

  render() {
    if (this.state.Char == null) {
      return <Title>Loading Character...</Title>;
    } else {
      return (
        <Card>
          <img
            src={
              this.state.Char.thumbnail.path +
              "." +
              this.state.Char.thumbnail.extension
            }
            alt="Thumbnail"
          />
          <Title>{this.state.Char.name}</Title>
          {this.state.Char.description ? (
            <Title>{this.state.Char.description}</Title>
          ) : (
            <Title>No description available</Title>
          )}
          <Subtitle>Features</Subtitle>

          {this.state.Char.comics.items.map((c, index) => {
            return (
              <>
                <StyledLink to={"/" + this.idChar + "/" + index} key={index}>
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

export default Char;
