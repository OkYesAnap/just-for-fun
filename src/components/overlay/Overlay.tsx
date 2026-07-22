import React from 'react';
import styled from 'styled-components';
import {ReactComponent as Spinner} from '../../icons/SpinnerDotsScaleRotate.svg';


const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    opacity: 50%;
    z-index: 10;
`;


const LoadingOverlay: React.FC = () => (
    <Overlay>
        <Spinner style={{height: '5vw', width: '5vw'}}/>
    </Overlay>
);

export default LoadingOverlay;