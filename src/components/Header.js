import React from 'react';
import './Header.css';
import anumatiLogo from '../images/anumatiLogo.jpg';

class Header extends React.Component {
    render() {
        return (
            <div className='app-header'>
                <img src={anumatiLogo} height='30' />
                <span className='sign-out'>Sign out</span>
            </div>
        );
    }
}

export default Header;
