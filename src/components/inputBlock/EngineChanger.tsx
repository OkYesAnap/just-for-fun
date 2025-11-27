import React, {useContext} from "react";
import {Popover} from "antd";
import {Engines} from "../../constants/constants";
import InputLabel from "./InputLabel";
import {MenuItems} from "./interfaces";
import OptionsMenu from "./OptionsMenu";
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

    return (
        <Popover content={<OptionsMenu {...{items, activeItem: engine, placement: "top"}}/>}>
            <div>
                <InputLabel>
                    {labelTemplate} {engine.toUpperCase()}
                </InputLabel>
            </div>
        </Popover>
    )
};

export default EngineChanger