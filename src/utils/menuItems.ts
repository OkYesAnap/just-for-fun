import {MenuItems} from "../components/inputBlock/interfaces";
import {Engines, IVoiceEngines, ModelTypes, VoiceEngineSingleType} from "./constanst";
import {Dispatch, SetStateAction} from "react";

type ItemType = typeof Engines | IVoiceEngines | ModelTypes[]

type OnClickCallbackType =
	Dispatch<SetStateAction<Engines>> |
	Dispatch<SetStateAction<VoiceEngineSingleType>>|
	Dispatch<SetStateAction<ModelTypes>>;

interface MenuItemsProps {
	items: ItemType;
	onClickCallback: OnClickCallbackType;
	additionalText?: string;
};

export const getMenuItems = ({items, onClickCallback, additionalText = ''}: MenuItemsProps): MenuItems => {
	return Object.values(items).map(item => ({
			key: item,
			onClick: () => onClickCallback(item),
			label: additionalText + item.toUpperCase()
		}
	));
}