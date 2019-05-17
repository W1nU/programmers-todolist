import React, {Component} from 'react';
import './App.css';
import {Alert} from 'react-bootstrap';
import NavigationBar from './components/NavigationBar/Navigationbar';
import TodoContainer from './containers/TodoBoxContainer';
import TodoForm from './components/Form/TodoForm';
import axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: {title: 'WEB', sub: "World wide web"},
            inSignIn: false,
            sessionKey: '',
            isLogin: false,
            todo: [{"title" : "산책하기", "content" : "오후 12시에 산책하기", "time" : null}],
            alertShow: false,
            alertMessage: '',
            email: '',
            inAddTodo: false,
            addTitle: '',
            url: '',
            isModifyTodo: false,
            selectedTodo: null,
            selectedTodoId: null
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

    _modifyTodo = (todoTitle, todoContent, todoTime) => {
        let modifiedTodo = this.state.todo;
        modifiedTodo[this.state.selectedTodoId].content = todoContent;
        modifiedTodo[this.state.selectedTodoId].time = todoTime;
        modifiedTodo[this.state.selectedTodoId].title = todoTitle;

        this.setState({
            todo: modifiedTodo,
            inAddTodo: false
        })
    }

    _updateAddTodo = (todoTitle, todoContent, todoTime) => {
        let tempTodo = this.state.todo

        tempTodo.push({
            'title': todoTitle,
            'content' : todoContent,
            'time' : todoTime
        });

        this.setState({
            todo: tempTodo
        })
        console.log(this.state.todo)
    };

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
        const addTodo = () => {
            this.setState({inAddTodo: true, addTitle: "할 일 추가하기", isModifyTodo: false})
        };

        const modiTodo = (id) => {
            this.setState({
                inAddTodo: true,
                addTitle: "할 일 수정하기",
                selectedTodo: this.state.todo[id],
                isModifyTodo: true,
                toModify: this._modifyTodo
            });
        };

        const updateSelectedTodo = (id) => {
            this.setState({selectedTodoId : id});
        }

        const deleteTodo = (id) => {
            this.state.todo.splice(id,1);
            let tempTodo = this.state.todo;
            this.setState({
                 todo: tempTodo
            });

            console.log(this.state.todo)
        };

        return (
            <div className="App">
                <div id='navbar'>
                    <NavigationBar isLogin={this.state.isLogin} login={this._login} setEmail={this._setUserEmail}/>
                </div>
                <Alert show={this.state.alertShow} dismissible onClose={this._closeAlert} variant="success">
                    {this.state.alertMessage}
                </Alert>
                <TodoForm
                    show = {this.state.inAddTodo}
                    onHide = {close}
                    title = {this.state.addTitle}
                    url = {this.state.url}
                    email = {this.state.email}
                    isModifyTodo = {this.state.isModifyTodo}
                    selectedTodo = {this.state.selectedTodo}
                    toModify = {this._modifyTodo}
                    updateAddTodo = {this._updateAddTodo}
                />

                <TodoContainer
                    email={this.state.email}
                    addTodo={addTodo}
                    modiTodo={modiTodo}
                    todo={this.state.todo}
                    deleteTodo={deleteTodo}
                    setSelected={updateSelectedTodo}
                />
            </div>
        );
    }
}

export default App;
