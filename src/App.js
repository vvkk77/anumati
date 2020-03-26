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
            loggedIn: false,
            accountId: null,
            organizationId: null,
            authToken: null
        };
    }

    onLoginSuccess = async (accountId, authToken, organizationId) => {
        this.setState({
            loggedIn: true,
            accountId: accountId,
            authToken: authToken,
            organizationId: organizationId
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
                    <ListRequest
                     organization= {this.state.organization}
                     accountId= {this.state.accountId}
                     authToken= {this.state.authToken}
                    />
                </div>
            );
        }
    }
}

export default App;
