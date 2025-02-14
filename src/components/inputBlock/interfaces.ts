export interface IMenuItem {
	key: string,
	onClick: () => void,
	label: string
}

export type MenuItems = IMenuItem[];