import React from 'react';
import Login from './components/Login';
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
        <div>
          <Login></Login>
        </div>
      );      
    } else {
      return (
        <div>
          <h1>Without Login</h1>
        </div>
      );
    }
  }
}

export default App;
