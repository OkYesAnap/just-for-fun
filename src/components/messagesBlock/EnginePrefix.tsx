import {EngineRole, IEngineMessage} from '../../api/gptApi';
import {Engines} from '../../constants/constants';
import {ReactComponent as DeepSeek} from '../../icons/DeepSeek_logo.svg';
import {ReactComponent as OpenAI} from '../../icons/OpenAI_Logo.svg';
import React, {RefObject, useEffect, useRef} from 'react';

const iconStyle = {height: '2.4vw', maxHeight: '30px'};

const supStyle = {
    fontSize: '0.6em',
    marginLeft: '2px',
    verticalAlign: 'top'
};

const onOffAnimation = (logoRef: RefObject<SVGSVGElement>, playAnimation: boolean) => {
    const animateTransformElement = logoRef?.current?.getElementsByTagName('animateTransform')[0];
    if (animateTransformElement) {
        const getAnimationAttributes = animateTransformElement.attributes;
        const durAttribute = getAnimationAttributes.getNamedItem('dur');
        if (durAttribute) {
            durAttribute.value = playAnimation ? '2s' : '0';
        }
    }
}

const EnginePrefix: React.FC<{ message: IEngineMessage }> = ({message}) => {
    const deepSeekRef = useRef<SVGSVGElement>(null);
    const openAIRef = useRef<SVGSVGElement>(null);
    useEffect(() => {
        const isInProgress = message.role === EngineRole.inprogress;
        if (deepSeekRef.current) {
            onOffAnimation(deepSeekRef, isInProgress);
        }
        if (openAIRef.current) {
            onOffAnimation(openAIRef, isInProgress);
        }
    }, [message.role]);

    if (message.engine === Engines.DEEP_SEEK) {
        return (<>
            <DeepSeek ref={deepSeekRef} style={iconStyle}/>
            <sup style={supStyle}>{message.model}</sup>
        </>)
    }
    if (message.engine === Engines.GPT) {
        return (<>
            <OpenAI ref={openAIRef} style={iconStyle}/>
            <sup style={supStyle}>{message.model}</sup>
        </>)
    }
    return null
}

export default EnginePrefix