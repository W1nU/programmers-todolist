import React, {Component} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import Alerts from "./AuthForm";


class AddTodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoTitle: '',
            todoContent: '',
            email: this.props.email,
            qType: ''
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

    }

    _sendForm = () => {
        axios.post("http://ec2-13-125-206-157.ap-northeast-2.compute.amazonaws.com:5000/add_todo", {
                "todoTitle": this.state.email,
                "todoContent": this.state.todoContent,
                "user_email": this.state.email,
                "q_type" : this.state.qType
            }
        ).then(data => this._checkResponse(data)).catch(err => console.log(err));

    }

    render() {
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
                    <Form.Control id="todo_title" onChange={this._setTodoTitle} placeholder="할 일을 입력하세요"/>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>내용</Form.Label>
                    <Form.Control id="todo-content" onChange={this._setTodoContent} placeholder="할 일의 내용을 입력하세요"/>\
                </Form.Group>
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

export default AddTodoForm;