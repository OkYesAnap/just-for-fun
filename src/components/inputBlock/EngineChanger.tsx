import React, {Dispatch, SetStateAction} from "react";
import {Dropdown, Menu, Popover} from "antd";
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
			key: Engines.DEEP_SEEK,
			onClick: () => setEngine(Engines.DEEP_SEEK),
			label: labelTemplate + Engines.DEEP_SEEK.toUpperCase()
		},
		{
			key: Engines.GPT,
			onClick: () => setEngine(Engines.GPT),
			label: labelTemplate + Engines.GPT.toUpperCase()
		}
	];

	return (<Popover content={<DropdownMenu {...{items, activeItem: engine}}/>}
	                 placement="top">
		<div><InputLabel>{labelTemplate} {engine.toUpperCase()}</InputLabel></div>
	</Popover>)
}

export default EngineChanger