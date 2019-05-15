import React, {Component} from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar/Navigationbar'
import TodoContainer from './containers/TodoBoxContainer';
import axios from "axios";
import Base64 from "crypto-js/enc-base64";
import sha256 from "crypto-js/sha256";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: {title: 'WEB', sub: "World wide web"},
            inSignIn: false,
            sessionKey: '',
            isLogin: false,
            todo: []
        }
    }

    _login = (session_key) => {
        this.setState({
            sessionKey: session_key,
            isLogin: true
        });
        console.log(this.state)
    }

    _sessionCheck = () => {
        if(localStorage.sesstionKey){
            axios.post("http://ec2-13-125-206-157.ap-northeast-2.compute.amazonaws.com:5000/check_session", {
                    "sessionKey": localStorage.sesstionKey,
                    "user_email": localStorage.user_email
                }
            ).then(data => (data) => {
                if(data[0] === true){
                    return 1
                }
                else{
                    return 0
                }
            }).catch(err => console.log(err))
        }
        else{
            return 0
        }

    }

    componentDidMount() {
        if(this._sessionCheck() === 1){
            this.setState({
                sessionKey: localStorage.sesstionKey,
                isLogin: true
            })
        }
    }

    render() {
        return (
            <div className="App">
                <div id='navbar'>
                    <NavigationBar isLogin={this.state.isLogin} login={this._login}/>
                </div>
                <TodoContainer/>

            </div>
        );
    }
}

export default App;
