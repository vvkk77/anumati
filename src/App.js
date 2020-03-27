import React from 'react';
import Login from './components/Login';
import ListRequest from './components/ListRequest';
import Header from './components/Header';
import './App.css';
import anumatiLogo from './images/anumatiLogo.jpg';
import FullScreenLoader from './components/FullScreenLoader';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: this.checkLoginSession(),
            loading: false,
        };

        window.addEventListener('hideLoader', () => {
            this.setState({ loading: false });
        });

        window.addEventListener('showLoader', () => {
            this.setState({ loading: true });
        });
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
                    {this.state.loading ? <FullScreenLoader /> : null}
                </div>
            );
        } else {
            return (
                <div>
                    <Header />
                    <ListRequest />
                    {this.state.loading ? <FullScreenLoader /> : null}
                </div>
            );
        }
    }
}

export default App;
