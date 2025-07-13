import {Menu} from "antd";
import React from "react";
import {MenuItems} from "./interfaces";
import {Engines, VoiceEngineSingleType} from "../../constants/constants";

const menuStyle: React.CSSProperties = {
    backgroundColor: "#282c34",
    color: "white",
    textAlign: "center",
    width: "fit-content",
    margin: "auto",
    border: "#F5F5F5 1px solid",
    borderRadius: "10px"
};

interface DropdownMenuProps {
    items: MenuItems,
    activeItem?: Engines | VoiceEngineSingleType
}

const OptionsMenu: React.FC<DropdownMenuProps> = ({items, activeItem}) => {
    const selected = items.find(item => item.key === activeItem)?.key;
    return (
        <Menu style={menuStyle} selectedKeys={[selected || '']} items={items}/>);
}

export default OptionsMenu;