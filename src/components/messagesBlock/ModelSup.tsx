import {IEngineMessage} from "../../api/gptApi";

interface ModelSupProps {
    message: IEngineMessage;
}

const supStyle = {
    fontSize: '0.6em',
    marginLeft: '2px',
    verticalAlign: 'top'
};

const ModelSup: React.FC<ModelSupProps> = ({message}) => {
    return <sup style={supStyle}>{message.model} {message.time && (message.time / 1000 + " Sec ")}</sup>
};

export default ModelSup;