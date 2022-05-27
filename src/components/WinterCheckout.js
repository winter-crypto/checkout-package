import React, { useEffect, useState } from 'react';

interface Props {
    winterProjectUrl: string;
    showModal?: boolean;
}

const WinterCheckoutModal: React.FC<Props> = ({
    projectId,
    showModal = false,
    production = true,
}) => {
    const [openModal, setOpenModal] = useState(showModal);
    const [projectUrl, setProjectUrl] = useState('');

    useEffect(() => {
        setOpenModal(showModal);
    }, [showModal]);

    useEffect(() => {
        const url = production ?
            'https://checkout.usewinter.com/?projectId=' + projectId :
            'https://sandbox-winter-checkout.onrender.com/?projectId=' + projectId;
        setProjectUrl(url);
    })

    window.addEventListener('message', (event) => {
        if (event.data == 'closeWinterCheckoutModal') {
            setOpenModal(false);
        }
    });

    return openModal ? (
        <iframe
            id='winter-checkout'
            src={projectUrl}
            style={{
                position: 'fixed',
                top: '0px',
                bottom: '0px',
                right: '0px',
                width: '100%',
                border: 'none',
                margin: 0,
                padding: 0,
                overflow: 'hidden',
                zIndex: 999999,
                height: '100%',
            }}
        ></iframe>
    ) : (
            <></>
        );
};

export default WinterCheckout;