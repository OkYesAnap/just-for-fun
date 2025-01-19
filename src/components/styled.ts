import styled from "styled-components";

export const ButtonAsk = styled.button`
  margin: 0.3rem 0.1rem;
  padding: 1rem 0.75rem;
  background-color: #2196F3;
  color: white;
  font-size: 1.3rem;
  border: 1px solid white;
  border-radius: 0.25rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? '0.5' : '1'};

  &:hover {
    background-color: #1976D2;
  }
`