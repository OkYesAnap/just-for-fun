import styled from "styled-components";

export const ButtonAsk = styled.button`
  margin: 0.1rem;
  padding: 0.5rem 0.2rem;
  background-color: #2196F3;
  color: white;
  font-size: 1rem;
  border: 1px solid white;
  border-radius: 0.25rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? '0.5' : '1'};

  &:hover {
    background-color: #1976D2;
  }
`