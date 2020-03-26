import React from 'react';
import Login from './components/Login';
import ListRequest from './components/ListRequest';
import Header from './components/Header';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
        };
    }

    onLoginSuccess = async () => {
        this.setState({
            loggedIn: true,
        });
    };

    render() {
        if (!this.state.loggedIn) {
            return (
                <div className='login-form'>
                    <img
                        src='../anumatiLogo.jpg'
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
