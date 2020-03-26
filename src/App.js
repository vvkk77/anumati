import React from 'react';
import Login from './components/Login';
import ListRequest from './components/ListRequest';
import Header from './components/Header';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      login: 0
    }

    this.loginSuccess = this.loginSuccess.bind(this);
  }

  async loginSuccess() {
    await this.setState({
      login: 1
    });
  }
  
  render() {
    if (this.state.login === 0) {
      return (
        <div className="login-form">
          <img src="../anumatiLogo.jpg" style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto"
          }} />
          <Login
          loginSuccess={this.loginSuccess} />
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
