import styled from "styled-components";
import {EngineRole} from "../api/gptApi";

export const ButtonAsk = styled.button`
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
`

const setBackgroundColor = ($role: EngineRole) => {
	if ($role === EngineRole.user) {
		return "darkolivegreen";
	} else if ($role === EngineRole.error) {
		return "red";
	}
	return 'green'
}

interface MessageBlockProps {
	$role: EngineRole;
	$engine?: string;
}

export const MessageBlock = styled.div<MessageBlockProps>`
  margin: ${({$role}) => ($role === 'user' ? '10px 10vmin 10px 20px' : '10px 20px 10px 10vmin')};
  text-align: left;
  background-color: ${({$role}) => setBackgroundColor($role)};
  padding: 20px;
  border-radius: 10px;
  font-size: clamp(10px, 2.5vh, 20px);
  white-space: pre-wrap;
  animation: fadeIn ${({$role}) => $role === EngineRole.user ? '500ms' : '1000ms'} ease-in;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`