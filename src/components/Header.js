import React from 'react';
import './Header.css';
import anumatiLogo from '../images/anumatiLogo.jpg';

class Header extends React.Component {
    logout = () => {
        localStorage.clear();
        window.location.reload();
    };

    render() {
        return (
            <div className='app-header'>
                <img src={anumatiLogo} height='30' />
                <h3 className='text-primary font-weight-bold m-0'>Approval Dashboard</h3>
                <span onClick={this.logout} className='sign-out'>
                    Sign out
                </span>
            </div>
        );
    }
}

export default Header;
