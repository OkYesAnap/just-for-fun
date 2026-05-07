import React, {useContext} from 'react';
import {ChatContext} from "../../context/ChatContext";

const Base64Image = () => {
    const {imageBase64, setImageBase64} = useContext(ChatContext);

    return (
        <div style={{position: 'relative', display: 'inline-block'}}>
            {imageBase64 && (
                <button
                    onClick={() => setImageBase64('')}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '25px',
                        height: '25px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        lineHeight: '25px',
                        textAlign: 'center',
                        padding: 0,
                        zIndex: 1,
                    }}
                >
                    ✖
                </button>
            )}
            <img
                style={{
                    maxWidth: '1000px',
                    maxHeight: '500px',
                    height: 'auto',
                    border: '2px dashed gray',
                    padding: '10px',
                }}
                src={imageBase64}
                alt="Base64"
            />
        </div>
    );
};

export default Base64Image;