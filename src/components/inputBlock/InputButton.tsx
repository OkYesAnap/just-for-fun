import styled from "styled-components";

export const UnputButton = styled.button`
  margin: 0.3rem 0.1rem;
  padding: 0.2rem 0.75rem;
  background-color: #2196F3;
  min-height: 50px;
  color: white;
  font-size: clamp(6px, 2.5vw, 20px);
  border: 1px solid white;
  border-radius: 0.25rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? '0.5' : '1'};

  &:hover {
    background-color: #1976D2;
  }
`;