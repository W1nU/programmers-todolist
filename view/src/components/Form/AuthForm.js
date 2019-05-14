import React, {Component} from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import axios from 'axios';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

import Alerts from '../Alerts';

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlert: false,
            email : '',
            password : '',
        }

    }

    _setUserEmailInfo = (e) => {
        console.log(this.props);
        this.setState({
            email: e.target.value
        })
    };

    _setUserPasswordInfo = (e) => {
        this.setState({
            password: e.target.value
        })
    };

    _sendForm = () => {
        axios.post(this.props.url, {
                "user_email": this.state.email,
                "user_password": Base64.stringify(sha256(this.state.password))
            }
        ).then(data => console.log(data)).catch(err => console.log(err));
        // let xhr = new XMLHttpRequest();
        // xhr.open("POST", this.props.url, true);
        // xhr.setRequestHeader("Content-Type", "application/json");
        // var data = JSON.stringify({"user_email": this.state.email, "user_password": this.state.password});
        // console.log(data)
        // xhr.send(data);
        // console.log(xhr.responseText)
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
                            {this.props.authTitle}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Alerts show={this.state.showAlert} alertTitle="이메일/비밀번호를 확인하세요."/>
                        <Form>
                            <Form.Group controlId="formBasicEmail">

                                <Form.Label>이메일</Form.Label>
                                <Form.Control id = "user_email" onChange={this._setUserEmailInfo} type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control id = "user_password" onChange={this._setUserPasswordInfo} type="password" placeholder="Password"/>
                            </Form.Group>
                            <Button variant="primary" onClick={this._sendForm}>
                                {this.props.authButtonType}
                            </Button>
                            <Button variant="secondary" onClick={this.props.onHide}>
                                닫기
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}


export default AuthForm;