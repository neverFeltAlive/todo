import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import styled from "styled-components";

//region Style
const Wrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #121212;
`;

const Header = styled.h1`
  color: whitesmoke;
  font-size: 40px;
  font-family: 'Fugaz One', cursive;
  letter-spacing: 3px;
  text-shadow: 3px 3px 2px gray;
  margin: 20px;

  @media (min-width: 1200px){
    font-size: 60px;
    text-shadow: 5px 5px 2px gray;
  }
`;
//endregion

function App() {
    return (
        <Wrapper className="App">
            <Header>TODOs list</Header>
            <TodoList/>
        </Wrapper>
    );
}

export default App;
