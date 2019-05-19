import React, {Component} from 'react';
import {Form, Button, Modal, Alert} from 'react-bootstrap';
import axios from 'axios';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlert: false,
            email : '',
            password : '',
            error: "",
            refreshState: this.props.refreshState
        }
    }

    _setUserEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    };

    _setUserPasswordInfo = (e) => {
        this.setState({
            password: e.target.value
        })
    };

    _alertControl = (errormsg) => {
        setTimeout( () => this.setState({
            error: errormsg,
            showAlert: true,
        }), 10);
    };

    _closeAlert = () => {
        this.setState({
            showAlert: false
        })
    };

    _checkEmail = () => {
        let exptext = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

        if(exptext.test(this.state.email) === false){
            this._alertControl("이메일 양식으로 입력해 주세요");
            return 0
        }
        return 1
    };

    _checkPassword = () => {
        let num = this.state.password.search(/[0-9]/g);
        let eng = this.state.password.search(/[a-z]/ig);
        let spe = this.state.password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

        if(this.state.password.length < 8 || this.state.password.length > 20){
            this._alertControl("비밀번호는 8자리 이상 20자리 이하로 입력해야 합니다");
            return 0
        }

        if(this.state.password.search(/\s/) !== -1){
            this._alertControl("비밀번호는 공백없이 입력해주세요");
            return 0
        }

        if(num < 0 || eng < 0 || spe < 0){
            this._alertControl("비밀번호는 영문, 숫자, 특수문자를 혼합하여 사용하여야 합니다");
            return 0
        }

        return 1
    };

    _checkResponse = (data) => {
        if(data.data[0] === 0){
            this._alertControl(data.data[1])
        }
        else{
            this.props.onHide();
            localStorage.sessionKey = data.data[2];
            localStorage.user_email = this.state.email;
            this.props.login(data.data[2]);
        }
    };

    _sendForm = () => {
        this.props.setEmail(this.state.email);

        if(navigator.onLine === false){
            this._alertControl("네트워크 연결을 확인하세요");
            return;
        }

        if(this._checkEmail() === 0 || this._checkPassword() === 0) { return 0 }

        else {
            axios.post(this.props.url, {
                    "user_email": this.state.email,
                    "user_password": Base64.stringify(sha256(this.state.password))
                }
            ).then(data => this._checkResponse(data)).catch(err => {
                this._alertControl("서버에 문제가 있습니다. 관리자에게 문의하세요");
            });
        }
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            showAlert: false,
            error: ""
        })

        if(nextProps.refreshState === true){
            setTimeout(() => {this.setState({
                email: '',
                password: ''
            }) }, 0);
            this.props.refreshStateDone()
        }
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
                        <Alert show={this.state.showAlert} dismissible onClose={this._closeAlert} variant="danger">
                            {this.state.error}
                        </Alert>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>이메일</Form.Label>
                                <Form.Control id = "user_email" onChange={this._setUserEmail} type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control id = "user_password" onChange={this._setUserPasswordInfo} type="password" placeholder="Password"/>
                                <Form.Text>
                                    비밀번호는 영문, 숫자, 특수문자를 모두 최소 1가지 이상 혼용하여야 합니다.
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" onClick={this._sendForm}>
                                {this.props.authButtonType}
                            </Button>
                            &nbsp;&nbsp;
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