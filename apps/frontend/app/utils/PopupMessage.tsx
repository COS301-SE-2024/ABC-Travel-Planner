import React, { useEffect, useState } from 'react';
import './PopupMessage.css';

const PopupMessage = ({msg, trigger}: {msg: string, trigger: boolean}) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (trigger) {
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 4000);
        }
    }, [trigger]);

    return (
        <div>
            {show && <div className='popup-message'>{msg}</div>}
        </div>
    );
}
export default PopupMessage;