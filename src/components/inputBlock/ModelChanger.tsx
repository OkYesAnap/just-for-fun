import React, {useContext, useEffect, useState} from "react";
import {Popover} from "antd";
import {Models} from "../../constants/constants";
import InputLabel from "./InputLabel";
import {MenuItems} from "./interfaces";
import OptionsMenu from "./OptionsMenu";
import {getMenuItems} from "../../utils/menuItems";
import {ChatContext} from "../../context/ChatContext";


const ModelChanger: React.FC = () => {
    const {engine, model, setModel} = useContext(ChatContext);
    const [currentModelsList, setCurrentModelsList] = useState(Models[engine]);
    const labelTemplate = 'Model ';

    useEffect(() => {
        setCurrentModelsList(Models[engine]);
        setModel(model || Models[engine][0])
    }, [model, engine, setModel]);

    const items: MenuItems = getMenuItems({
            items: currentModelsList,
            onClickCallback: setModel,
            additionalText: labelTemplate
        }
    );

    return (<Popover content={<OptionsMenu {...{items, activeItem: model}}/>}
                     placement="top">
        <div><InputLabel>{labelTemplate} {model.toUpperCase()}</InputLabel></div>
    </Popover>)
}

export default ModelChanger