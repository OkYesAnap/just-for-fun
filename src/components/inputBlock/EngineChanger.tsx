import React, {Dispatch, SetStateAction} from "react";
import {Dropdown, Menu} from "antd";
import {Engines} from "../../utils/constanst";
import InputLabel from "./InputLabel";
import {MenuItems} from "./interfaces";
import DropdownMenu from "./DropdownMenu";


const EngineChanger: React.FC<{
	engine: Engines;
	setEngine: Dispatch<SetStateAction<Engines>>
}> = ({engine, setEngine}) => {
	const labelTemplate = '"Ask" for request to ';
	const items: MenuItems = [
		{
			key: "1",
			onClick: () => setEngine(Engines.DEEP_SEEK),
			label: labelTemplate + Engines.DEEP_SEEK.toUpperCase()
		},
		{
			key: "2",
			onClick: () => setEngine(Engines.GPT),
			label: labelTemplate + Engines.GPT.toUpperCase()
		}
	];

	return (<Dropdown overlay={<DropdownMenu {...{items}}/>}
	                  placement="top">
		<div><InputLabel>{labelTemplate} {engine.toUpperCase()}</InputLabel></div>
	</Dropdown>)
}

export default EngineChanger