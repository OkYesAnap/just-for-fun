import {MenuItemType} from "antd/es/menu/interface";


export interface IMenuItem extends MenuItemType {
    key: string,
    onClick: () => void,
    label: string
}

export type MenuItems = IMenuItem[];