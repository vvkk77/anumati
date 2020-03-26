import React from 'react';
import Login from './components/Login';
import ListRequest from './components/ListRequest';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      login: 0
    }
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
          <Login></Login>
        </div>
      );      
    } else {
      return (
        <div>
          <ListRequest
            organization= 'random'
            accountId = 'random'
            authToken= 'random'
					/>
        </div>
      );
    }
  }
}

export default App;
