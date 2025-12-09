import {DataAttributes} from "styled-components";


export interface IMenuItem extends DataAttributes {
    key: string,
    onClick: () => void,
    label: string
}

export type MenuItems = IMenuItem[];