import styled from "styled-components";
import {gptRole} from "../api/gptApi";

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

const setBackgroundColor = (role: gptRole) => {
	if (role === gptRole.user) {
		return "darkolivegreen";
	} else if (role === gptRole.error) {
		return "red";
	}
	return 'green'
}

export const MessageBlock = styled.div`
  margin: ${({role}) => (role === 'user' ? '10px 10vmin 10px 20px' : '10px 20px 10px 10vmin')};
  text-align: left;
  background-color: ${({role}) => setBackgroundColor(role as gptRole)};
  padding: 20px;
  border-radius: 10px;
  white-space: pre-wrap;
  animation: fadeIn ${({role}) => role === 'user' ? '500ms' : '1000ms'} ease-in;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`