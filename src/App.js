import React from "react";
import "../src/style.css";
import Characters from "../src/components/Character/Characters";
import Details from "../src/components/Character/Details";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "../src/components/NavBar/NavBar";
import Comics from "../src/components/Comics/Comics";
import DetailsComics from "../src/components/Comics/DetailsComic";
import Char from "./components/Character/GroupChar";
import ComicDetails from "./components/Comics/ComicDetails";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  background-color: #202020;
`;

function App() {
  return (
    <Container>
      <BrowserRouter>
        <NavBar></NavBar>
        <Switch>
          <Route path="/" component={Characters} exact />
          <Route path="/:id" component={Details} exact />
          <Route path="/:id/:idComic" component={DetailsComics} exact />
          <Route path="/comics/list/result" component={Comics} exact />
          <Route path="/result/comic/path/:id" component={ComicDetails} exact />
          <Route path="/result/character/ch/:id" component={Char} exact />
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
