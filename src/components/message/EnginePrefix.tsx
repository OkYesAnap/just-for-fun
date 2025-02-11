import { engineRole, IEngineMessage } from '../../api/gptApi';
import { Engines } from '../../utils/constanst';
import DeepSeek from '../../icons/DeepSeek_logo.svg';
import OpenAI from '../../icons/OpenAI_Logo.svg';
import React from 'react';

const EnginePrefix:React.FC<{message: IEngineMessage}> = ({message}) => {
	if (message.engine === Engines.DEEP_SEEK) {
		return (<img src={DeepSeek} style={{height: '30px', color: "#fff"}} alt="Deepseek Icon"/>)
	}
	if (message.engine === Engines.GPT) {
		return (<img src={OpenAI} style={{height: '30px', color: "#fff"}} alt="Deepseek Icon"/>)
	}
	return null
}

export default EnginePrefix