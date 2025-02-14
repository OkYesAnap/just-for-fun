import styled from "styled-components";
import React from "react";

export const InputButtonStyled = styled.button`
  margin: 0.3rem 0.1rem;
  padding: 0.2rem 0.75rem;
  background-color: #15222c;
  min-height: 50px;
  color: white;
  font-size: clamp(6px, 2.5vw, 20px);
  border: 1px solid white;
  border-radius: 1rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? '0.5' : '1'};

  &:hover {
    background-color: #000000;
  }
`;

interface InputButtonProps {
	onClick: () => void;
	style?: React.CSSProperties;
	disabled?: boolean;
	children: React.ReactNode;
}

const InputButton: React.FC<InputButtonProps> = ({onClick, disabled, style, children}) => {
	return <InputButtonStyled {...{onClick, disabled, style}}>{children}</InputButtonStyled>
};

export default InputButton