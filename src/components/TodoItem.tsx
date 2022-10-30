import React, {useState} from 'react';
import {TodoItemType} from "./TodoList";
import {FaTimes, FaCheck} from "react-icons/fa";
import styled from "styled-components";
import {Button as Btn} from "./UI";

//region Type
type TodoItemProps = {
    item: TodoItemType
    removeFunc: (id: number) => void
    toggleComplete: () => void
}

type StyledProps = {
    isComplete: boolean
}
//endregion

//region Style
const Button = styled(Btn)`
  color: lightcoral;
  cursor: pointer;
  
  @media (min-width: 1200px){
    margin-left: 20px;
  }
`;

const Container = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: whitesmoke;
  font-weight: 700;
  padding: 0 5px;
  font-size: 18px;
  border: 3px solid transparent;
  cursor: pointer;

  @media (min-width: 1200px){
    font-size: 25px;
  }
  
  ${props => {
    if (props?.isComplete){
      return `
            opacity: 0.5;
        `
    } else return "";
  }};
  
  &:hover{
    border: 3px solid black;
    border-radius: 5px;
  }
`;

const CheckButton = styled(Btn)`
  color: lightgreen;
  margin-right: 20px;
`;

const P = styled.p<StyledProps>`
  margin: 0;
  text-align: left;
  width: 100%;
  ${props => {
    if (props?.isComplete){
        return `
            text-decoration: line-through;
        `
    } else return "";
  }};
  
`;
//endregion

/**
 * Component which represents a single todo item in the list
 * @param item - the item of the todo list
 * @param removeFunc - function to remove item from the list
 * @constructor
 */
const TodoItem = ({item, removeFunc, toggleComplete}: TodoItemProps): JSX.Element => {
    return (
        <Container onClick={() => toggleComplete()} isComplete={item.isComplete}>
            <CheckButton style={item.isComplete ? {} : {opacity: 0}}><FaCheck/></CheckButton>
            <P isComplete={item.isComplete}>{item.text}</P>
            <Button onClick={(e) => removeFunc(item.id)}><FaTimes/></Button>
        </Container>
    );
};

export default TodoItem;