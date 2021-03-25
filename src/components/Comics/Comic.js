import React from "react";
import { Link } from "react-router-dom";
import image from "../Pics/image";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-content: center;
`;

const Title = styled.h1`
  font-family: "Marvel", sans-serif;
  font-size: 2em;
  width: 50%;
  color: white;
`;

function Comic(props) {
  return (
    <Container>
      <Title>{props.title} </Title>
      <img
        style={image}
        src={props.thumbnail.path + ".jpg"}
        alt={props.title + "Image"}
      />
      <Link to={"/result/comic/path/" + props.id}>See more details...</Link>
    </Container>
  );
}

export default Comic;
