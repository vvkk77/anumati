import React from 'react';
import Login from './components/Login';
import ListRequest from './components/ListRequest';
import Header from './components/Header';
import './App.css';
import anumatiLogo from './images/anumatiLogo.jpg';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: this.checkLoginSession(),
        };
    }

    checkLoginSession = () => {
        const expiry = localStorage.getItem('expiry');
        return localStorage.getItem('auth') && expiry && new Date(expiry) > Date.now();
    };

    onLoginSuccess = () => {
        this.setState({
            loggedIn: true,
        });
    };

    render() {
        if (!this.state.loggedIn) {
            return (
                <div className='login-form'>
                    <img
                        src={anumatiLogo}
                        style={{
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                    />
                    <Login onLogin={this.onLoginSuccess} />
                </div>
            );
        } else {
            return (
                <div>
                    <Header />
                    <ListRequest />
                </div>
            );
        }
    }
}

export default App;
