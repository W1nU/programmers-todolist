import React, { Component } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar/Navigationbar'
import SignInForm from './components/Form/SignInForm';

class App extends Component


{
  constructor(props){
    super(props);
    this.state = {
      subject:{title:'WEB', sub:"World wide web"},
      inSignIn : false
    }
  }


  render() {
    return (
      <div className = "App" >
          <NavigationBar isLogin={false} />
      </div>
    );
  }
}

export default App;
