import React, { Component } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar/Navigationbar'
import TodoContainer from './containers/TodoBoxContainer';
import TodoBox from './components/Todo/TodoBox';

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
          <div id = 'navbar'>
            <NavigationBar isLogin={false} />
          </div>
          <TodoContainer />

      </div>
    );
  }
}

export default App;
