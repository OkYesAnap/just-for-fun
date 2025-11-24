import {EngineRole, IEngineMessage} from "../../api/gptApi";
import {useEffect, useRef, useState} from "react";

interface ModelSupProps {
    message: IEngineMessage;
}

const supStyle = {
    fontSize: '0.6em',
    marginLeft: '2px',
    verticalAlign: 'top'
};

const ModelSup: React.FC<ModelSupProps> = ({message}) => {
    const startTimer = useRef<number | null>();
    const [currentTime, setCurrentTime] = useState<number | undefined>();
    const timer = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (message.time) {
            setCurrentTime(message.time);
        }
        if (message.role === EngineRole.inprogress) {
            startTimer.current = Date.now();
            timer.current = setInterval(() => {
                setCurrentTime(Date.now() - (startTimer.current || 0));
            }, 75)
        }
        return () => {
            if (timer.current) {
                clearInterval(timer.current);
            }
        };
    }, [message.role, message.time]);

    return <sup
        style={supStyle}>{message.model} {currentTime && ((currentTime / 1000).toFixed(2) + " Sec ")}</sup>
};

export default ModelSup;