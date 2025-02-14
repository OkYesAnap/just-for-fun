import React, {ReactNode} from "react";
import styled from "styled-components";
import {Input} from "antd";

const LabelStyled = styled.div`
  font-size: clamp(6px, 2.5vw, 20px);
  background-color: #282c34;
  border: #F5F5F5 1px solid;
  border-radius: 1vh;
  padding: 0.5vw;
  margin: auto;
  width: fit-content;
  color: #F5F5F5;
`;

interface InputLabelProps {
	children: ReactNode,
	callback?: () => void
}

const InputLabel: React.FC<InputLabelProps> = ({children, callback}) => {
	return <LabelStyled onClick={callback}>{children}</LabelStyled>
};

export default InputLabel