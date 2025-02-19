export interface MarkdownItemProps {
	tag: string,
	begin: number | null,
	end: number | null,
	title?: string,
	content?: string
}

export const defaultMdItem = {begin: null, end: null, tag: ''};