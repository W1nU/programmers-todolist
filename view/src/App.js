import React, {Component} from 'react';
import './App.css';
import {Alert} from 'react-bootstrap';
import NavigationBar from './components/NavigationBar/Navigationbar';
import TodoContainer from './containers/TodoBoxContainer';
import AddTodoForm from './components/Form/AddTodoForm';
import axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: {title: 'WEB', sub: "World wide web"},
            inSignIn: false,
            sessionKey: '',
            isLogin: false,
            todo: [],
            alertShow: false,
            alertMessage: '',
            email: '',
            inAddTodo: false,
            addTitle: '',
            url: ''
        }
    }

    _setUserEmail = (email) => {
        this.setState({
            email:email
        })
    }

    _login = (session_key) => {
        this.setState({
            sessionKey: session_key,
            isLogin: true
        });
        console.log(this.state)
    };

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
    };

    _closeAlert = () => {
        this.setState({
            alertShow: false
        })
    };

    _displayAlert = (M) => {
        this.setState({
            alertShow: true,
            alertMessage: M
        })
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
        const close = () => {this.setState({inAddTodo: false})};
        const addTodo = () => {this.setState({inAddTodo: true})}
        return (
            <div className="App">
                <div id='navbar'>
                    <NavigationBar isLogin={this.state.isLogin} login={this._login} setEmail={this._setUserEmail}/>
                </div>
                <Alert show={this.state.alertShow} dismissible onClose={this._closeAlert} variant="success">
                    {this.state.alertMessage}
                </Alert>
                <AddTodoForm
                    show = {this.state.inAddTodo}
                    onHide = {close}
                    title = {this.state.addTitle}
                    url = {this.state.url}
                    email = {this.state.email}
                />

                <TodoContainer
                    email={this.state.email}
                    addTodo={addTodo}
                />
            </div>
        );
    }
}

export default App;
