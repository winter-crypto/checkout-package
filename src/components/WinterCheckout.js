import React, { useEffect, useState } from 'react';

const WinterCheckout = (props) => {
    const [openModal, setOpenModal] = useState(false);
    const [projectUrl, setProjectUrl] = useState('');

    useEffect(() => {
        setOpenModal(props.showModal);
    }, [props.showModal]);

    useEffect(() => {
        let queryString = 'projectId=' + props.projectId;
        if (props.walletAddress != null) {
            queryString += '&walletAddress=' + props.walletAddress;
        }
        if (props.email != null) {
            queryString += '&email=' + props.email;
        }

        const url = props.production ?
            'https://checkout.usewinter.com/?' + queryString :
            'https://sandbox-winter-checkout.onrender.com/?' + queryString;
        setProjectUrl(url);
    }, [props.projectId, props.production, props.walletAddress, props.email])

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
            }
            }
        > </iframe>
    ) : (
            <></>
        );
};

export default WinterCheckout;