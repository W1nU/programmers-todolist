import React, {Component} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoTitle: '',
            todoContent: '',
            email: this.props.email,
            qType: '',
            isModify: false,
            time: null,
            url: this.props.url,
            contentPlaceholder: "할 일의 내용을 입력하세요",
            titlePlaceholder: "할 일을 입력하세요"
        }
    }

    _setTodoTitle = (e) => {
        this.setState(
            {todoTitle: e.target.value}
        )
    };

    _setTodoContent = (e) => {
        this.setState(
            {todoContent: e.target.value}
        )
    };

    _checkResponse = (data) => {

    };

    _sendForm = () => {
        if (this.props.isModifyTodo === true) {
            this.props.toModify(this.state.todoTitle, this.state.todoContent, this.state.time);
            return; //여기서 수정후에 보내야함
        } else if (this.props.isModifyTodo === false) {
            console.log("run")
            this.props.updateAddTodo(this.state.todoTitle, this.state.todoContent, this.state.time)
        }

        axios.post(this.state.url, {
                "todoTitle": this.state.email,
                "todoContent": this.state.todoContent,
                "user_email": this.state.email,
                "q_type": this.state.qType
            }
        ).then(data => this._checkResponse(data)).catch(err => console.log(err));
        this._clearTime()
    };


    _clearTime = () => {
        if (this.state.isModify === false) {
            this.setState({time: ""})
        }
    };

    _setValueTitle = (e) => {
        if (this.props.isModifyTodo === true) {
            e.target.value = this.state.todoTitle
        }
    }

    _setValueContent = (e) => {
        if (this.props.isModifyTodo === true) {
            e.target.value = this.state.todoContent
        }
    }

    _setValueTime = (e) => {
        if (this.props.isModifyTodo === true && this.state.time !== null) {
            e.target.value = this.state.time
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.isModifyTodo === true) {
            this.setState({
                isModify: nextProps.isModifyTodo,
                todoTitle: nextProps.selectedTodo['title'],
                todoContent: nextProps.selectedTodo['content'],
                time: nextProps.selectedTodo['time'],
                contentPlaceholder: nextProps.selectedTodo['content'],
                titlePlaceholder: nextProps.selectedTodo['title']
            })
        } else {
            this.setState({
                contentPlaceholder: "할 일의 내용을 입력하세요",
                titlePlaceholder: "할 일을 입력하세요"
            });
            console.log(this.state)
        }
    }


    render() {
        const handleTimeChange = (e) => {
            this.setState({...this.state, time: e});
        };

        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>할 일</Form.Label>
                    <Form.Control id="todo_title" onChange={this._setTodoTitle} onClick={this._setValueTitle}
                                  placeholder={this.state.titlePlaceholder}/>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>내용</Form.Label>
                        <Form.Control as="textarea" id="todo-content" onClick={this._setValueContent}
                                      onChange={this._setTodoContent}
                                      placeholder={this.state.contentPlaceholder}/>
                    </Form.Group>

                    <Form.Label>날짜</Form.Label>
                    <br/>
                    <DatePicker
                        minDate={new Date()}
                        selected={this.state.time}
                        onChange={handleTimeChange}
                        isClearable={true}
                        placeholderText="필요시 날자를 선택하세요"
                        onClick={this._setValueTime}
                    />

                    <br/>
                    <br/>
                    <Button variant="primary" onClick={this._sendForm}>
                        저장
                    </Button>
                    &nbsp;&nbsp;
                    <Button variant="secondary" onClick={this.props.onHide}>
                        닫기
                    </Button>
                </Modal.Body>
            </Modal>
        )
    }
}


export default TodoForm;