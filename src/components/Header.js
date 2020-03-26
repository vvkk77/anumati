import React from 'react';
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <div className='app-header'>
                <img src='../anumatiLogo.jpg' height='30' />
                <span className='sign-out'>Sign out</span>
            </div>
        );
    }
}

export default Header;
