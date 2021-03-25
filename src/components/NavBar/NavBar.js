import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Img from "../../header-image.jpg";

const HeaderTitle = styled.div`
  height: 25em;
  background: url(${Img});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: left;
  margin-bottom: 1em;
`;

const HeaderTitleShadow = styled.div`
  background: linear-gradient(to top, #202020 15%, transparent 85%);
  width: 100%;
  display: flex;
`;

const Title = styled.h1`
  color: white;
  font-family: "Marvel", sans-serif;
  margin-top: 0.5em;
  margin-left: 1.1em;
  font-size: 100px;
  text-shadow: 2px 2px #0c0c0c;

  @media (max-width: 800px) {
    margin-top: 1em;
    margin-left: 2em;
    font-size: 30pt;
  }

  @media (max-width: 400px) {
    margin-top: 1em;
    margin-left: 2em;
    font-size: 20pt;
  }
`;

const activeClassName = "nav-item-active";

const StyledLink = styled(NavLink).attrs({ activeClassName })`
  &.${activeClassName} {
    cursor: pointer;
  display: inline-block;
  text-decoration: none;
  text-align: center;
  margin-right: 1em;
  margin-left: 5em;
  margin-top: 2em;
  color: #fff;
  font-weight: bold;
  width: 10%;
  height: 7%;
  background-color: #f30000;
  padding: 10px 30px;
  font-size: 1em;
  border: 1px solid #0000;
  background-image: linear-gradient(bottom, #f30000 0%, #f30000 100%);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0px 6px 0px #882424, 0px 3px 15px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 3px rgba(255, 255, 255, 0.5);
  -moz-box-shadow: 0px 6px 0px #882424, 0px 3px 15px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 3px rgba(255, 255, 255, 0.5);
  box-shadow: 0px 6px 0px #882424, 0px 3px 15px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 3px rgba(255, 255, 255, 0.5);
  transition: all ease-in-out 0.5s;
  text-align: center;
}
@media (max-width: 850px) {
  
    font-size: 0.6em;
  
}
@media(max-width: 400px){
  
    height: 2em;
    align-content: center;
  
}
  }
`;

class NavBar extends React.Component {
  render() {
    return (
      <HeaderTitle>
        <HeaderTitleShadow>
          <StyledLink to="/">Heroes</StyledLink>
          <Title>MARVEL COMICS</Title>
        </HeaderTitleShadow>
      </HeaderTitle>
    );
  }
}

export default NavBar;
