import styled from "styled-components";

export const Button = styled.button`
  border: none;
  outline: none;
  color: lightgreen;
  font-weight: 700;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  padding: 5px;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover{
    background-color: rgba(150, 150, 150, 0.1);
    border-radius: 50%;
  }
  
  @media (min-width: 1200px){
    font-size: 30px;
    padding: 10px;
    width: 40px;
    height: 40px;
  }
`;