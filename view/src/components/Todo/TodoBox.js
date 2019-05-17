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

    _refreshTodo = () => {

        let tempTodoJSX = [];
        let tempTodoContentJSX = [];

        for (let i = 0; i < this.props.todo.length; i++) {
            tempTodoJSX.push(
                <ListGroup.Item action href={"#" + i}>
                    {this.props.todo[i]['title']}
                    <Button size="sm" onClick={this._deleteTodo} className="todo-buttons" variant="danger"
                            id={"button-remove#" + i}>삭제</Button>
                    <div className="todo-buttons">&nbsp;</div>
                    <Button onClick={this._modify} size="sm" className="todo-buttons" variant="warning"
                            id={"button-remove#" + i}>수정</Button>
                </ListGroup.Item>
            );

            tempTodoContentJSX.push(
                <Tab.Pane eventKey={"#" + i}>
                    <TodoContent content={this.props.todo[i]['content']}/>
                </Tab.Pane>
            )
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
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                <Row>
                    <Col sm={4}>
                        <ListGroup>
                            {this.state.todoJSX}
                            <ListGroup.Item action onClick={this.props.addTodo}>
                                + 추가하기
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content>
                            {this.state.todoContentJSX}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        )

    }
}

export default TodoBox;
