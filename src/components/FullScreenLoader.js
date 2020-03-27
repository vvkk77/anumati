import React from 'react';
import { Spinner } from 'react-bootstrap';

const BaseCard = () => {
    return (
        <div className='full-screen-loader h-100 d-flex justify-content-center align-items-center position-fixed"'>
            <Spinner animation='border' variant='primary' />
        </div>
    );
};

export default BaseCard;
