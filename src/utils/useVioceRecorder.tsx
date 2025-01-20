import React, {useRef, useEffect} from 'react';
import {sendAudioToServer} from "../api/gptApi";

const useVoiceRecorder = (isListening: boolean, setText: React.Dispatch<React.SetStateAction<string>>) => {
	let textTranscription: string;
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunksRef = useRef<Blob[]>([]);

	useEffect(() => {
			if (isListening) {
				startRecording();
			} else {
				stopRecording();
			}
		}
		, [isListening])

	const startRecording = async () => {
		const stream = await navigator.mediaDevices.getUserMedia({audio: true});
		mediaRecorderRef.current = new MediaRecorder(stream);

		mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
			audioChunksRef.current.push(event.data);
		};

		mediaRecorderRef.current.onstop = async () => {
			const audioBlob = new Blob(audioChunksRef.current, {type: 'audio/wav'});
			audioChunksRef.current = [];
			textTranscription = await sendAudioToServer(audioBlob);
			setText(prevState => `${prevState} ${textTranscription}`);
		};

		mediaRecorderRef.current.start();
	};
	const stopRecording = () => {
		mediaRecorderRef.current?.stop();
	};
};

export default useVoiceRecorder;