import React from "react";
import { Link } from "react-router-dom";
import Image from "../Pics/image";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  width: 33% img;
  padding: 10px;
`;

const Title = styled.h1`
  font-family: "Marvel", sans-serif;
  font-size: 2em;
  width: 50%;
  color: white;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: red;
  border: none;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
`;

function Character(props) {
  return (
    <>
      <Card>
        <Title>{props.name}</Title>
        <div className="card">
          <img
            style={Image}
            src={props.thumbnail.path + "." + props.thumbnail.extension}
            alt={props.name + "Image"}
          />
        </div>
        <Link to={"/" + props.id}>
          <Button>See details... </Button>
        </Link>
      </Card>
      <br />
    </>
  );
}

export default Character;
