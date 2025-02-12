import React, {Dispatch, SetStateAction} from "react";
import {Dropdown} from "antd";
import {Engines} from "../../utils/constanst";


const EngineChanger: React.FC<{
	engine: Engines;
	setEngine: Dispatch<SetStateAction<Engines>>
}> = ({engine, setEngine}) => {

	const labelTemplate = '"Ask" for request to';

	const items = [
		{
			key: "1",
			label: (<div onClick={() => setEngine(Engines.DEEP_SEEK)}>{labelTemplate} DEEPSEEK</div>)
		},
		{
			key: "2",
			label: (<div onClick={() => setEngine(Engines.GPT)}>{labelTemplate} GPT</div>)
		}
	]

	return (<Dropdown menu={{items}}
	                  placement="top">
		<div>{labelTemplate} {engine.toUpperCase()}</div>
	</Dropdown>)
}

export default EngineChanger