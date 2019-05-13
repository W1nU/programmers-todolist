import React, {Component} from 'react';
import {Form, Button, Modal, Alert} from 'react-bootstrap';
import Alerts from '../Alerts';

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {showAlert: false}
    }

    render() {
        return (
            <div>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            회원가입
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Alerts show={this.state.showAlert} alertTitle="이메일/비밀번호를 확인하세요."/>
                        <Form>
                            <Form.Group controlId="formBasicEmail">

                                <Form.Label>이메일</Form.Label>
                                <Form.Control type="email" placeholder="Enter email"/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control type="password" placeholder="Password"/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            회원가입
                        </Button>
                        <Button variant="secondary" onClick={this.props.onHide}>
                            닫기
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


export default SignInForm;