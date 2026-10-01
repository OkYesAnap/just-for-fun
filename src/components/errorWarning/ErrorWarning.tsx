import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface ErrorWarningProps {
    message: string | null;
    onClear: () => void;
}

const ErrorWarningContainer = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    background-color: #ff4d4f;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(255, 77, 79, 0.4);
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    max-width: 400px;
    animation: slideIn 0.3s ease-out, fadeOut 0.5s ease-in 4.5s forwards;
    
    @keyframes slideIn {
        0% {
            transform: translateX(100%);
            opacity: 0;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: translateX(0);
        }
        100% {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;

const ErrorWarningIcon = styled(ExclamationCircleOutlined)`
    font-size: 18px;
    flex-shrink: 0;
`;

const ErrorMessage = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const ErrorWarning: React.FC<ErrorWarningProps> = ({ message, onClear }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClear();
            }, 5000);
            
            return () => clearTimeout(timer);
        }
    }, [message, onClear]);
    
    if (!message) return null;
    
    return (
        <ErrorWarningContainer>
            <ErrorWarningIcon />
            <ErrorMessage>{message}</ErrorMessage>
        </ErrorWarningContainer>
    );
};

export default ErrorWarning;
