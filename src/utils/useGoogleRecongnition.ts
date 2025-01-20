import React, {useEffect} from "react";

const useGoogleRecognition = (isListening: boolean,
                              setIsListening: React.Dispatch<React.SetStateAction<boolean>>,
                              setText: React.Dispatch<React.SetStateAction<string>>,
                              lang: string) => {
	//@ts-ignore
	const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
	recognition.lang = lang;
	recognition.onaudioend = () => setIsListening(false);
	useEffect(() => {
		recognition.continuous = true;
		recognition.interimResults = true;

		//@ts-ignore
		recognition.onresult = (event: SpeechRecognitionEvent) => {
			const currentTranscript = event.results[event.resultIndex][0].transcript;
			console.log(event.results);
			const isFinal = event.results[event.resultIndex].isFinal;
			if (isFinal) setText((prev) => prev + ' ' + currentTranscript);
		};
		if (isListening) {
			recognition.start()
		} else {
			recognition.stop();
		}
		return () => {
			recognition.stop();
		};
	}, [isListening]);
}

export {useGoogleRecognition}