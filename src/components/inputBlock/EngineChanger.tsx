import React, {useContext} from "react";
import {Popover} from "antd";
import {Engines} from "../../utils/constanst";
import InputLabel from "./InputLabel";
import {MenuItems} from "./interfaces";
import DropdownMenu from "./DropdownMenu";
import {getMenuItems} from "../../utils/menuItems";
import {ChatContext} from "../../context/ChatContext";


const EngineChanger: React.FC = () => {

	const {engine, setEngine} = useContext(ChatContext);
	const labelTemplate = 'Engine ';
	const items: MenuItems = getMenuItems({
			items: Engines,
			additionalText: labelTemplate,
			onClickCallback: setEngine
		}
	);

	return (<Popover content={<DropdownMenu {...{items, activeItem: engine}}/>}
	                 placement="top">
		<div><InputLabel>{labelTemplate} {engine.toUpperCase()}</InputLabel></div>
	</Popover>)
}

export default EngineChanger