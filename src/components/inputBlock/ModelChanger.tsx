import React, {useContext, useEffect, useState} from "react";
import {Popover} from "antd";
import {Models} from "../../utils/constanst";
import InputLabel from "./InputLabel";
import {MenuItems} from "./interfaces";
import DropdownMenu from "./DropdownMenu";
import {getMenuItems} from "../../utils/menuItems";
import {ChatContext} from "../../context/ChatContext";


const ModelChanger: React.FC = () => {
	const {engine, model, setModel} = useContext(ChatContext);
	const [currentModelsList, setCurrentModelsList] = useState(Models[engine])
	const labelTemplate = 'Model ';

	useEffect(() => {
		setCurrentModelsList(Models[engine])
		setModel(Models[engine][0])
	}, [engine, setModel]);

	const items: MenuItems = getMenuItems({
			items: currentModelsList,
			onClickCallback: setModel,
			additionalText: labelTemplate
		}
	);

	return (<Popover content={<DropdownMenu {...{items, activeItem: model}}/>}
	                 placement="top">
		<div><InputLabel>{labelTemplate} {model.toUpperCase()}</InputLabel></div>
	</Popover>)
}

export default ModelChanger