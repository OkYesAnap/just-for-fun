import {Menu} from "antd";
import React from "react";
import {MenuItems, IMenuItem} from "./interfaces";

const menuStyle: React.CSSProperties = {
	backgroundColor: "transparent",
	color: "white",
	textAlign: "center",
	width: "fit-content",
	margin: "auto",
	border: "#F5F5F5 1px solid"
};

const menuItemStyle: React.CSSProperties = {
	color: "white"
};

const DropdownMenu: React.FC<{ items: MenuItems }> = ({items}) => (
	<Menu style={menuStyle}>
		{items.map((item: IMenuItem) => (
			<Menu.Item style={menuItemStyle} {...{...item}}>
				{item.label}
			</Menu.Item>))}
	</Menu>);

export default DropdownMenu;