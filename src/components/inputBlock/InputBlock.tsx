import EngineChanger from "./EngineChanger";
import InputButton from "./InputButton";
import VoiceInput from "./VoiceInput";
import {Input} from "antd";
import React, {useCallback, useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import styled from "styled-components";
import {ChatContext} from "../../context/ChatContext";
import {TextAreaRef} from "antd/es/input/TextArea";
import {setTextAreaActualHeight} from "../../utils/textArea";
import ModelChanger from "./ModelChanger";
import {contextEngine, EngineRole} from "../../api/gptApi";
import {useAskEngine} from "../../hooks/useAskEngine";
import Base64Image from "../image/Base64Image";

const InputBlockStyled = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    max-height: 100%;
    bottom: 0;
    padding-top: 10px;
    width: 80%;
`;

const TextAreaStyled = styled(Input.TextArea)`
    border-radius: 8px;
    width: inherit;
    font-size: clamp(6px, 2.5vw, 20px);
    transition: height 0.2s ease-in-out;
    background-color: #bebebe;
`;

const InfoAreaStyled = styled.div`
    display: flex;
    width: inherit;
`;

const InputBlock: React.FC = () => {
    const textAreaRef = useRef<TextAreaRef>(null);
    const {engine, model, params} = useContext(ChatContext);
    const [showImage, setShowImage] = useState(false);
    const askEngine = useAskEngine(params);
    const {
        setAutoAsk,
        askInProgress,
        autoAsk,
        isListening,
        text,
        setShowClearModal,
        setText,
        imageBase64,
        setImageBase64
    } = useContext(ChatContext);
    const hasText = !!text.trim().length;

    useLayoutEffect(() => {
        setTextAreaActualHeight(textAreaRef);
    }, [text]);

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handlePaste = async (e: React.ClipboardEvent<HTMLDivElement>) => {
        const clipboardItems = e.clipboardData.items;

        for (let i = 0; i < clipboardItems.length; i++) {
            const item = clipboardItems[i];

            if (item.type.startsWith('image/')) {
                const blob = await item.getAsFile();
                if (blob) {
                    const base64 = await fileToBase64(blob);
                    setImageBase64(base64);
                    console.log({
                        content: [
                            {
                                type: 'input_file',
                                filename: 'pasted-image.png',
                                file_data: base64,
                            },
                        ],
                    });
                }
                return; // Skip to next item if needed
            }
        }
        const text = e.clipboardData.getData('Text');
        if (text) {
            setText((prevText) => prevText + text + '\n');
        }
    };

    const handlePasteClick = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setText((prevText) => prevText + text + '\n');
        } catch (err) {
            console.error('Error reading from clipboard!', err);
        }
    };

    const updateAndAskEngine = useCallback(() => {
        contextEngine.update({content: text, role: EngineRole.user, engine, model, imageBase64});
        askEngine();
    }, [text, engine, model, imageBase64, askEngine]);

    const onClick = () => {
        setAutoAsk(false);
        updateAndAskEngine();
    };

    useEffect(() => {
            if (autoAsk && isListening && !askInProgress && hasText) {
                updateAndAskEngine();
            }
            if (!text) {
                textAreaRef?.current?.focus();
            }
        },
        [askInProgress, autoAsk, isListening, askEngine, hasText, text, updateAndAskEngine]);

    const handleEnterPress: React.KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
        if (event.ctrlKey && event.key === 'Enter' && !askInProgress) {
            updateAndAskEngine()
        }
        if (event.key === 'Escape' && !askInProgress) {
            setShowClearModal(true);
        }
    };

    const onChangeTextAria = (e: any) => {
        setText(e.target.value);
    };

    const handleShowImage = () => {
        setShowImage(!showImage);
    };

    return (
        <InputBlockStyled onPaste={handlePaste}>
            {showImage && imageBase64 && <Base64Image/>}
            <InfoAreaStyled>
                <div style={{flex: 5, display: "flex", flexFlow: "column"}}>
                    <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                        <div style={{flex: 1}}>
                            <EngineChanger/>
                        </div>
                        <div style={{flex: 1}}>
                            <ModelChanger/>
                        </div>
                    </div>
                    <div style={{display: "flex"}}>
                        <div style={{display: "flex"}}>
                            <InputButton {...{onClick: handlePasteClick}}>
                                Paste
                            </InputButton>
                            <InputButton {...{
                                onClick: handleShowImage,
                                disabled: !imageBase64
                            }}>
                                IMG
                            </InputButton>
                        </div>
                        <div style={{width: "100%"}}>
                            <InputButton {...{
                                onClick,
                                disabled: askInProgress
                            }}>
                                Ask
                            </InputButton>
                        </div>
                    </div>
                </div>
                <VoiceInput/>
            </InfoAreaStyled>
            <TextAreaStyled value={text} ref={textAreaRef}
                            onPaste={(e) => e.preventDefault()}
                            disabled={(autoAsk && isListening) || askInProgress}
                            onChange={onChangeTextAria} onKeyDown={handleEnterPress}/>
        </InputBlockStyled>)
}

export default InputBlock;