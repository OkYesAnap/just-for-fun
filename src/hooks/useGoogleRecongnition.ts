import {useCallback, useContext, useEffect, useMemo} from "react";
import {voiceEngines} from "../utils/constants";
import {ChatContext} from "../context/ChatContext";

const useGoogleRecognition = () => {

	const {
		setText,
		setDraftText,
		lang,
		isListening,
		setIsListening,
		voiceInputEngine,
		setVoiceInputEngine,
		setGoogleRecognizerAvailable
	} = useContext(ChatContext);

	const recognition = useMemo(() => {
		try {
			//@ts-ignore
			return new (window.SpeechRecognition || window.webkitSpeechRecognition)()
		} catch (e) {
			console.error(`Google recognition is not supported in this browser. For the best experience, 
			please use Google Chrome. 
			Please note that this browser currently only supports the GPT API engine, 
			and the functionality has now changed to the working schemas.`);
			return null;
		}
	}, []);


	const setTextCallBack = useCallback((text: string) => {
		if (text.trim().length) {
			setText((prev) => `${prev} ${text}.\n`);
		}
	}, [setText]);

	const setDraftTextCallback = useCallback((text: string) => {
		setDraftText(text)
	}, [setDraftText])

	useEffect(() => {
		if (recognition === null) {
			setVoiceInputEngine(voiceEngines.gpt);
			setGoogleRecognizerAvailable(false);
			return;
		}
		recognition.lang = lang;
		recognition.onaudioend = () => setIsListening(false);
		recognition.continuous = true;
		recognition.interimResults = true;

		//@ts-ignore
		recognition.onresult = (event: SpeechRecognitionEvent) => {
			const currentTranscript = event.results[event.resultIndex][0].transcript;
			setDraftTextCallback(event.results[event.resultIndex][0].transcript);
			const isFinal = event.results[event.resultIndex].isFinal;
			if (isFinal) {
				setTextCallBack(currentTranscript);
				setDraftTextCallback('');
			}
		};
		if (isListening && voiceInputEngine === voiceEngines.google) {
			recognition.start()
		} else {
			recognition.stop();
			setDraftTextCallback('');
		}
		return () => {
			recognition.stop();
			setDraftTextCallback('');
		};
	}, [isListening,
		setTextCallBack,
		setDraftTextCallback,
		recognition,
		lang,
		setVoiceInputEngine,
		setIsListening,
		setGoogleRecognizerAvailable,
		voiceInputEngine]);
}

export {useGoogleRecognition}