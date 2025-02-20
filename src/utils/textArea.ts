import {RefObject} from "react";
import {TextAreaRef} from "antd/es/input/TextArea";
import {defaultTextInputSize} from "./constants";

const defaultLines = 0;

const setTextAreaActualHeight = (textAreaRef: RefObject<TextAreaRef>, resetWindow: boolean = false) => {
	if (textAreaRef.current?.resizableTextArea) {
		const lineHeight = parseInt(getComputedStyle(textAreaRef.current.resizableTextArea.textArea).lineHeight, 10);
		textAreaRef.current.resizableTextArea.textArea.style.height = `${lineHeight * defaultTextInputSize + defaultLines * lineHeight}px`;
		if(!resetWindow) {
			const {scrollHeight} = textAreaRef.current.resizableTextArea.textArea;
			textAreaRef.current.resizableTextArea.textArea.style.height = `${scrollHeight + 4}px`;
		}
	}
}

export {setTextAreaActualHeight};