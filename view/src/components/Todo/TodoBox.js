import React, {Component} from "react";
import {ListGroup, Tab, Row, Col, Button} from "react-bootstrap";
import TodoContent from "./TodoContent"
import "./TodoBox.css"

class TodoBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: this.props.todo, // 여기 이부분 props로 내려줘야함
            todoJSX: [],
            todoContentJSX: [],
        };

        this.inDelete = false;
    }

    _deleteTodo = (e) => {
        this.inDelete = true;
        this.props.deleteTodo(e.target.id.substring(14, e.target.id.length))
    };

    _modify = (e) => {
        this.inDelete = false;
        this.props.setSelected(e.target.id.substring(14,e.target.id.length));
        this.props.modiTodo(e.target.id.substring(14, e.target.id.length))
    };

    _done = (e) => {
        this.props.doneTodo(e.target.id.substring(12, e.target.className.length))
    }

    _parseBrTag = (text) => {
        let temp = '';
        let tempJSX = [];

        for (let j = 0; j <= text.length; j++) {
            if (j === text.length) {
                tempJSX.push(temp);
            }

            if (text[j] === '\n') {
                tempJSX.push(temp);
                temp = '';
                tempJSX.push(<br/>)
            } else {
                temp += text[j];
            }
        }
        return tempJSX
    };

    _refreshTodo = () => {
        console.log(this.state.todo);
        let tempTodoJSX = [];
        let tempTodoContentJSX = [];
        let timeDisplay = null;
        let tempTodoContent = null;

        for (let i = 0; i < this.props.todo.length; i++) {
            timeDisplay = null;

            if(this.state.todo[i]['time'] !== null) {
                let getSelectedDate = new Date(this.state.todo[i]['time']);
                let color = getSelectedDate - new Date() > 0 ? "light" : "dark";

                timeDisplay = <Button disabled variant={color} size="sm">{getSelectedDate.getFullYear().toString().substring(2)+"/"+ (getSelectedDate.getMonth() + 1) +"/"+getSelectedDate.getDate()}</Button>
            }

            if(this.state.todo[i]['isDone'] === false){
                tempTodoJSX.push(
                    <ListGroup.Item action href={"#" + i}>
                        {i+1 + ". " + this.props.todo[i]['title']}

                        <div className="todo-list-buttons">
                            {timeDisplay}
                            <Button size="sm" onClick={this._deleteTodo} className="todo-buttons" variant="danger"
                                    id={"button-remove#" + i}>삭제</Button>
                            <div className="todo-buttons">&nbsp;</div>
                            <Button onClick={this._modify} size="sm" className="todo-buttons" variant="warning"
                                    id={"button-remove#" + i}>수정</Button>
                            <div className="todo-buttons">&nbsp;</div>
                            <Button size="sm" onClick={this._done} className="todo-buttons" variant="success" id = {"button-done#" + i}>완료</Button>
                        </div>
                    </ListGroup.Item>
                );

                tempTodoContent = this._parseBrTag(this.state.todo[i]['content']);

                tempTodoContentJSX.push(
                    <Tab.Pane eventKey={"#" + i}>
                        <TodoContent content={tempTodoContent}/>
                    </Tab.Pane>
                )
            }

            else if(this.state.todo[i]['isDone'] === true){
                tempTodoJSX.push(
                    <ListGroup.Item action href={"#" + i} className="done-todo">
                        {i+1 + ". " + this.props.todo[i]['title']}

                        <div className="todo-list-buttons">
                            {timeDisplay}
                            <Button size="sm" onClick={this._deleteTodo} className="todo-buttons" variant="danger"
                                    id={"button-remove#" + i}>삭제</Button>
                            <div className="todo-buttons">&nbsp;</div>
                            <Button size="sm" onClick={this._done} className="todo-buttons" variant="success" id = {"button-done#" + i} disabled>완료</Button>
                        </div>
                    </ListGroup.Item>
                )
                tempTodoContentJSX.push(
                    <Tab.Pane eventKey={"#" + i}>
                        <TodoContent content={this.props.todo[i]['content']}/>
                    </Tab.Pane>
                )
            }
        }
        this.setState({
            todoJSX: tempTodoJSX,
            todoContentJSX: tempTodoContentJSX
        });
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this._refreshTodo()
    }

    componentDidMount() {
        this._refreshTodo()
    }

    render() {
        return (
            <Tab.Container id="todo-list-group-tabs" defaultActiveKey="#link1">
                <Row>
                    <Col sm={4}>
                        <ListGroup id="todoList">
                            {this.state.todoJSX}
                            <ListGroup.Item action onClick={this.props.addTodo}>
                                + 추가하기
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content>
                            {/*{this.state.todoContentJSX.map((v,k)=>{*/}
                                {/*console.log(v)*/}
                                {/*return v;*/}
                            {/*})}*/}
                            {this.state.todoContentJSX}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        )

    }
}

export default TodoBox;
