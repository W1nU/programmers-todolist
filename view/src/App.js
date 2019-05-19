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

        //초기에 투두가 하나도 없을 떄 시용
        try {
            JSON.parse(localStorage.todo)
        } catch (e) {
            localStorage.todo = JSON.stringify([])
        }

        this.state = {
            subject: {title: 'WEB', sub: "World wide web"},
            inSignIn: false,
            sessionKey: '',
            isLogin: false,
            todo: JSON.parse(localStorage.todo),
            alertShow: false,
            alertMessage: '',
            email: '',
            inAddTodo: false,
            addTitle: '',
            url: '',
            isModifyTodo: false,
            selectedTodo: null,
            selectedTodoId: null,
            prioritySelectOptionJSX: [],
        }
    }

    _setUserEmail = (email) => {
        console.log(email);
        this.setState({
            email: email
        })
    };

    _getTodo = () => {
        axios.post("http://ec2-13-125-206-157.ap-northeast-2.compute.amazonaws.com:5000/get_todo", {
            "user_email": sessionStorage.user_email,
            "sessionKey" : sessionStorage.sessionKey
        }).then(data => {
            console.log(data)
            if(data.data[0] === 2){
                this._displayAlert("세션 오류. 다시 로그인 하세요.")
            }
            else if(data.data[0] == 0){
                return;
            }
            this.setState({
                todo:JSON.parse(data[1])
            })
        })
    }

    _logIn = (sessionkey) => {
        this.setState({
            sessionKey: sessionkey,
            isLogin: true
        });

        setTimeout(() => {
            sessionStorage.setItem("user_email", this.state.email);
            sessionStorage.setItem("isLogin", true);
            sessionStorage.setItem("sessionKey", sessionkey);
        }, 0);

        if(!localStorage.todo){ // 로컬 스토리지에 투두 기록이 있으면 그것을 우선 사용, 없으면 서버에서 가져와 사용
            this._getTodo();
        }
        else{
            console.log(sessionStorage)
            axios.post("http://ec2-13-125-206-157.ap-northeast-2.compute.amazonaws.com:5000/update_todo", {
                "user_email": sessionStorage.user_email,
                "sessionKey": sessionStorage.sessionKey,
                "todo": localStorage.todo
            }).then(data => {
                console.log(data)
            })
        }


    };

    _logOut = () => {
        axios.post("http://ec2-13-125-206-157.ap-northeast-2.compute.amazonaws.com:5000/logout", {
            "user_email": sessionStorage.user_email
        });

        this.setState({
            sessionKey: null,
            isLogin: false
        });

        sessionStorage.clear()
    };

    _sessionCheck = () => {
        axios.post("http://ec2-13-125-206-157.ap-northeast-2.compute.amazonaws.com:5000/check_session", {
                "sessionKey": sessionStorage.sessionKey,
                "user_email": sessionStorage.user_email
            }
        ).then(data => {
            if (data.data[0] === 1) {
                this._setLoginState();
                this._getTodo();

            } else if (data.data[0] === 2) {
                sessionStorage.clear();
                this._displayAlert("세션 오류입니다. 다시 로그인 하세요.");
            }
        }).catch(err => console.log(err))
    };

    _setLoginState = () => {
        this.setState({
            sessionKey: sessionStorage.getItem("sessionKey"),
            isLogin: sessionStorage.getItem("isLogin") === 'true',
            email: sessionStorage.getItem("user_email")
        })
    }

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
    };

    _doneTodo = (id) => {
        let tempTodo = this.state.todo;
        tempTodo[id]['isDone'] = true;

        this.setState({
            todo: tempTodo
        })
    };

    _modifyTodo = (todoTitle, todoContent, todoTime, priority) => {
        let modifiedTodo = this.state.todo;
        let selectedTodo = modifiedTodo[this.state.selectedTodoId];

        modifiedTodo[this.state.selectedTodoId].content = todoContent;
        modifiedTodo[this.state.selectedTodoId].time = todoTime;
        modifiedTodo[this.state.selectedTodoId].title = todoTitle;

        if (priority - 1 !== this.state.selectedTodoId) {
            console.log(this.state.selectedTodo, priority);
            modifiedTodo.splice(this.state.selectedTodoId, 1);
            modifiedTodo.splice(priority - 1, 0, selectedTodo)
        }

        this.setState({
            todo: modifiedTodo,
            inAddTodo: false
        });

        localStorage.todo = JSON.stringify(this.state.todo);

        if (this.state.isLogin === true) {
            if (navigator.onLine === false) {
                this._displayAlert("인터넷 연결을 확인하세요.");
                return;
            }
        }
        axios.post("http://ec2-13-125-206-157.ap-northeast-2.compute.amazonaws.com:5000/update_todo", {
            "user_email": sessionStorage.user_email,
            "sessionKey" : sessionStorage.sessionKey,
            "todo": JSON.stringify(localStorage.todo)
        }).then(data => {
            if (data[0] === 2) {
                this._logOut();
                this._displayAlert("세션 오류압나다. 다시 로그린 하세요.")
            } else {
                this._displayAlert(data[1])
            }
        })
    };


    _updateAddTodo = (todoTitle, todoContent, todoTime, todoPriority) => {
        let tempTodo = this.state.todo;

        tempTodo.splice(todoPriority - 1, 0, {
            'title': todoTitle,
            'content': todoContent,
            'time': todoTime,
            'isDone': false
        });

        this.setState({
            todo: tempTodo
        });

        localStorage.todo = JSON.stringify(this.state.todo);

        if (navigator.onLine === false) {
            this._displayAlert("인터넷 연결을 확인하세요.")
            return;
        }
        if (this.state.isLogin === true) {
            if (navigator.onLine === false) {
                this._displayAlert("인터넷 연결을 확인하세요.");
                return;
            }

            axios.post("http://ec2-13-125-206-157.ap-northeast-2.compute.amazonaws.com:5000/update_todo", {
                "user_email": sessionStorage.user_email,
                "sessionKey": sessionStorage.sessionKey,
                "todo": JSON.stringify(this.state.todo)

            }).then(data => {
                console.log(data)
                if (data.data[0] === 2) {
                    this._logOut();
                    this._displayAlert("세션 오류압나다. 다시 로그린 하세요.")
                } else {
                    this._displayAlert(data[1])
                }
            })
        }
    }
    ;

    componentDidMount() {
        this._sessionCheck()
    }
    ;


    render() {
        const close = () => {
            this.setState({inAddTodo: false})
        };
        const addTodo = () => {

            this.setState({
                inAddTodo: true,
                addTitle: "할 일 추가하기",
                isModifyTodo: false,
            })
        };

        const modiTodo = (id) => {
            let tempSelectFormJSX = [];
            for (let i = 0; i < this.state.todo.length; i++) {
                tempSelectFormJSX.push(
                    <option>{i + 1}</option>
                )
            }

            this.setState({
                inAddTodo: true,
                addTitle: "할 일 수정하기",
                selectedTodo: this.state.todo[id],
                isModifyTodo: true,
                toModify: this._modifyTodo,
                prioritySelectOptionJSX: tempSelectFormJSX
            });
        };

        const updateSelectedTodo = (id) => {
            this.setState({selectedTodoId: id});
        };

        const deleteTodo = (id) => {
            this.state.todo.splice(id, 1);
            let tempTodo = this.state.todo;
            this.setState({
                todo: tempTodo
            });

            localStorage.todo = JSON.stringify(this.state.todo);

        };

        return (
            <div className="App">
                <div id='navbar'>
                    <NavigationBar key="nav" isLogin={this.state.isLogin} login={this._logIn}
                                   setEmail={this._setUserEmail} logout={this._logOut}/>

                </div>
                <Alert show={this.state.alertShow} dismissible onClose={this._closeAlert} variant="danger">
                    {this.state.alertMessage}
                </Alert>
                <TodoForm
                    show={this.state.inAddTodo}
                    onHide={close}
                    title={this.state.addTitle}
                    url={this.state.url}
                    email={this.state.email}
                    isModifyTodo={this.state.isModifyTodo}
                    selectedTodo={this.state.selectedTodo}
                    toModify={this._modifyTodo}
                    updateAddTodo={this._updateAddTodo}
                    todo={this.state.todo}

                />

                <TodoContainer
                    email={this.state.email}
                    addTodo={addTodo}
                    modiTodo={modiTodo}
                    todo={this.state.todo}
                    deleteTodo={deleteTodo}
                    setSelected={updateSelectedTodo}
                    doneTodo={this._doneTodo}
                />
            </div>
        );
    }
}

export default App;
