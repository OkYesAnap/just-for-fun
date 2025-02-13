import {useRef, useEffect, useCallback, useContext} from 'react';
import {sendAudioToServer} from "../api/gptApi";
import {ChatContext} from "../context/ChatContext";
import {voiceEngines} from "../utils/constanst";

const useVoiceRecorder = () => {
	const {
		setText,
		isListening,
		voiceInputEngine
	} = useContext(ChatContext);

	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunksRef = useRef<Blob[]>([]);
	const stream = useRef<MediaStream | null>(null);

	const updateText = useCallback((transcription: string) => {
		setText(prevState => `${prevState} ${transcription}`);
	}, [setText]);

	const startRecording = useCallback(async () => {
		stream.current = await navigator.mediaDevices.getUserMedia({audio: true});
		mediaRecorderRef.current = new MediaRecorder(stream.current);

		mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
			audioChunksRef.current.push(event.data);
		};

		mediaRecorderRef.current.onstop = async () => {
			const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
			audioChunksRef.current = [];
			const textTranscription = await sendAudioToServer(audioBlob);
			updateText(textTranscription);
		};

		mediaRecorderRef.current.start();
	}, [updateText])
	const stopRecording = () => {
		mediaRecorderRef.current?.stop();
		if (stream.current) {
			stream.current?.getTracks().forEach(track => track.stop());
			stream.current = null
		}
	};

	useEffect(() => {

			if (isListening && voiceInputEngine === voiceEngines.gpt ) {
				startRecording();
			} else {
				stopRecording();
			}
			return () => {
				stopRecording()
			}
		}
		, [isListening, updateText, startRecording, voiceInputEngine])

};

export default useVoiceRecorder;