import React, {ReactNode} from "react";
import styled from "styled-components";

const LabelStyled = styled.div<{ $noBorder?: boolean }>`
  font-size: clamp(6px, 2.5vw, 20px);
  background-color: #282c34;
  ${({ $noBorder }) => ($noBorder ? '' : 'border: #F5F5F5 1px solid;')}
  border-radius: 1vh;
  padding: 0.5vw;
  margin: auto;
  width: fit-content;
  color: #F5F5F5;
`;

interface InputLabelProps {
	children: ReactNode,
	callback?: () => void,
	noBorder?: boolean
}

const InputLabel: React.FC<InputLabelProps> = ({children, noBorder,callback}) => {
	return <LabelStyled onClick={callback} $noBorder={noBorder}>{children}</LabelStyled>
};

export default InputLabel