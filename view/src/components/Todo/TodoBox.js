import React, {Component} from "react";
import {ListGroup, Tab, Row, Col } from "react-bootstrap";
import TodoContent from "./TodoContent"

class TodoBox extends Component {
    constructor(props){
        super(props)

    }

    render() {
        return (
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                <Row>
                    <Col sm={4}>
                        <ListGroup>
                            <ListGroup.Item action href="#link1">
                                Link 1
                            </ListGroup.Item>
                            <ListGroup.Item action href="#link2">
                                + 추가하기
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content>
                            <Tab.Pane eventKey="#link1">
                                <TodoContent content="hello world" />
                            </Tab.Pane>
                            <Tab.Pane eventKey="#link2">
                                <TodoContent />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        )

    }
}

export default TodoBox;
