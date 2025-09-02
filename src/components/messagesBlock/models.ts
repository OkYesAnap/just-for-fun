import {IEngineMessage} from "../../api/gptApi";
import {RefObject} from "react";

export interface MessageProps {
    i: number,
    message: IEngineMessage,
}

export interface MessageRefProps extends MessageProps {
    messageRef: RefObject<HTMLDivElement>,
}