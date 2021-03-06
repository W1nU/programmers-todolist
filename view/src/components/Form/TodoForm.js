import React, {Component} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import "./TodoForm.css";

class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoTitle: '',
            todoContent: '',
            qType: '',
            isModify: false,
            time: null,
            url: this.props.url,
            contentPlaceholder: "할 일의 내용을 입력하세요",
            titlePlaceholder: "할 일을 입력하세요",
            selectFormJSX : [],
            priority: 1
        };
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

    _sendForm = () => {
        if (this.props.isModifyTodo === true) {
            this.props.toModify(this.state.todoTitle, this.state.todoContent, this.state.time, this.state.priority);
            return; //여기서 수정후에 보내야함
        } else if (this.props.isModifyTodo === false) {
            this.props.updateAddTodo(this.state.todoTitle, this.state.todoContent, this.state.time, this.state.priority);
        }
        this._clearTime()
    };


    _clearTime = () => {
        if (this.state.isModify === false) {
            this.setState({time: null})
        }
        this.props.onHide()
    };

    _setValueTitle = (e) => {
        if (this.props.isModifyTodo === true) {
            e.target.value = this.state.todoTitle
        }
    };

    _setValueContent = (e) => {
        if (this.props.isModifyTodo === true) {
            e.target.value = this.state.todoContent
        }
    };

    _setPriority = (e) => {
        this.setState({
            priority: e.target.value
        })
    };

    _makePriorityOption = () => {
        let tempSelectFormJSX = [];

        let priorityOptionLength = this.props.isModifyTodo ? this.props.todo.length  : this.props.todo.length + 1;

        if(priorityOptionLength === 0 && this.props.isModifyTodo === false) { priorityOptionLength = 1 } //처음에 투두가 하나도 없을 떄 설정
        for (let i = 0; i < priorityOptionLength; i++) {
            tempSelectFormJSX.push(<option value={i + 1}>{i + 1}</option>)
        }

    return tempSelectFormJSX
}

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.isModifyTodo === true && nextProps.selectedTodo['time'] !== null) {
            this.setState({
                priority: 1,
                isModify: nextProps.isModifyTodo,
                todoTitle: nextProps.selectedTodo['title'],
                todoContent: nextProps.selectedTodo['content'],
                time: new Date(nextProps.selectedTodo['time']),
                contentPlaceholder: nextProps.selectedTodo['content'],
                titlePlaceholder: nextProps.selectedTodo['title']
            })
        }
        else if(nextProps.isModifyTodo === true){
            this.setState({
                priority: 1,
                isModify: nextProps.isModifyTodo,
                todoTitle: nextProps.selectedTodo['title'],
                todoContent: nextProps.selectedTodo['content'],
                time: null,
                contentPlaceholder: nextProps.selectedTodo['content'],
                titlePlaceholder: nextProps.selectedTodo['title']
            })
        }
        else {
            this.setState({
                priority: 1,
                contentPlaceholder: "할 일의 내용을 입력하세요",
                titlePlaceholder: "할 일을 입력하세요",
                todoTitle: "",
                todoContent: "",
                time: null
            });
        }
    }


    render() {
        const handleTimeChange = (e) => {
            this.setState({time: e});
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
                        <Form.Control as="textarea"  onClick={this._setValueContent}
                                      onChange={this._setTodoContent}
                                      placeholder={this.state.contentPlaceholder}/>
                        <Form.Label>우선순위</Form.Label>
                        <Form.Control as="select" onChange={this._setPriority}>
                            {this._makePriorityOption()}
                        </Form.Control>
                        </Form.Group>

                    <Form.Label>날짜</Form.Label>
                    <br/>
                    <DatePicker
                        minDate={new Date()}
                        selected={this.state.time}
                        onChange={handleTimeChange}
                        isClearable={true}
                        placeholderText="필요시 날자를 선택하세요"
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