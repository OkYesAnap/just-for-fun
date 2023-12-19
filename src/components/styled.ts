import styled from "styled-components";

export const ButtonAskBlock = styled.button`
  margin-bottom: 0.5rem;
  padding: 1rem 2rem;
  background-color: #2196F3;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? '0.5' : '1'};

  &:hover {
    background-color: #1976D2;
  }
`