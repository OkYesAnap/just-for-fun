import React, {useRef, useEffect, useCallback} from 'react';
import {sendAudioToServer} from "../api/gptApi";

const useVoiceRecorder = (isListening: boolean, setText: React.Dispatch<React.SetStateAction<string>>) => {
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunksRef = useRef<Blob[]>([]);
	const stream = useRef<MediaStream | null>(null);

	const updateText = useCallback((transcription: string) => {
		setText(prevState => `${prevState} ${transcription}`);
	}, [setText]);

	useEffect(() => {
			const startRecording = async () => {
				stream.current = await navigator.mediaDevices.getUserMedia({audio: true});
				mediaRecorderRef.current = new MediaRecorder(stream.current);

				mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
					audioChunksRef.current.push(event.data);
				};

				mediaRecorderRef.current.onstop = async () => {
					const audioBlob = new Blob(audioChunksRef.current, {type: 'audio/wav'});
					audioChunksRef.current = [];
					const textTranscription = await sendAudioToServer(audioBlob);
					updateText(textTranscription);
				};

				mediaRecorderRef.current.start();
			};
			const stopRecording = () => {
				mediaRecorderRef.current?.stop();
				if (stream.current) {
					stream.current?.getTracks().forEach(track => track.stop());
					stream.current = null
				}
			};

			if (isListening) {
				startRecording();
			} else {
				stopRecording();
			}
		}
		, [isListening, updateText])

};

export default useVoiceRecorder;