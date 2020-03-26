import React from 'react';
import './BaseCard.css';

const BaseCard = (props) => {
    let className = 'base-card';
    if (props.isActive) {
        className += ' active';
    }

    if (props.class) {
        className += ` ${props.class}`;
    }

    return (
        <div onClick={props.onClick} className={className}>
            {props.children}
        </div>
    );
};

export default BaseCard;
