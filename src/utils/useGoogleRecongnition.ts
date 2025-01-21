import {Dispatch, SetStateAction, useCallback, useEffect, useMemo} from "react";

const useGoogleRecognition = (isListening: boolean,
                              setIsListening: Dispatch<SetStateAction<boolean>>,
                              setText: Dispatch<SetStateAction<string>>,
                              lang: string,
                              setDraftText: Dispatch<SetStateAction<string>>
) => {
	const recognition = useMemo(() => {
		//@ts-ignore
		return new (window.SpeechRecognition || window.webkitSpeechRecognition)()
	}, []);
	recognition.lang = lang;
	recognition.onaudioend = () => setIsListening(false);

	const setTextCallBack = useCallback((text: string) => {
		setText((prev) => prev + ' ' + text);
	}, [setText]);

	const setDraftTextCallback = useCallback((text: string) => {
		setDraftText(text)
	}, [setDraftText])

	useEffect(() => {
		recognition.continuous = true;
		recognition.interimResults = true;

		//@ts-ignore
		recognition.onresult = (event: SpeechRecognitionEvent) => {
			const currentTranscript = event.results[event.resultIndex][0].transcript;
			console.log(event.results[event.resultIndex][0].transcript);
			setDraftTextCallback(event.results[event.resultIndex][0].transcript);
			const isFinal = event.results[event.resultIndex].isFinal;
			if (isFinal) {
				setTextCallBack(currentTranscript);
				setDraftTextCallback('');
			}
		};
		if (isListening) {
			recognition.start()
		} else {
			recognition.stop();
			setDraftTextCallback('');
		}
		return () => {
			recognition.stop();
			setDraftTextCallback('');
		};
	}, [isListening, setTextCallBack, setDraftTextCallback, recognition]);
}

export {useGoogleRecognition}