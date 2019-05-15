import React, {Component} from 'react';
import {Button, Nav, Navbar} from 'react-bootstrap';
import AuthForm from '../Form/AuthForm';

class Navigationbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Buttons: [],
            inAuth: false,
            authTitle: '',
            authType: '',
            url: ''
        };
        this._setButtons();
    }

    _setInSignIn = () => {
        this.setState({
            inAuth: true,
            authTitle: '회원가입',
            authType: '가입',
            url: "http://ec2-13-125-206-157.ap-northeast-2.compute.amazonaws.com:5000/signin"
        })
    }

    _setInLogin = () => {
        this.setState({
            inAuth:true,
            authTitle: '로그인',
            authType: '로그인',
            url: "http://ec2-13-125-206-157.ap-northeast-2.compute.amazonaws.com:5000/login"
        })
    }

    _setButtons = () => {
        if (this.props.isLogin === true) {
            this.state.Buttons.push(<Button id="loginButton" size="sm">로그아웃</Button>);
        } else {
            this.state.Buttons.push(<Button key="loginButton" id="loginButton" size="sm" onClick={this._setInLogin}>
                로그인</Button>);
            this.state.Buttons.push(<div key="buttonSpace" id="buttonSpace">&nbsp;</div>);
            this.state.Buttons.push(<Button key="signinButton" id="signinButton" size="sm"
                                            onClick={this._setInSignIn}>회원가입</Button>);

        }
    };

    render() {
        let authClose = () => this.setState({inAuth: false});
        // 이 메소드를 이용하여 창 닫기 제어

        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src="/logo.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                    {' Todo-List'}
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#home">이전 기록</Nav.Link>
                </Nav>
                {this.state.Buttons}
                <AuthForm
                    show = {this.state.inAuth}
                    onHide = {authClose}
                    authTitle = {this.state.authTitle}
                    authButtonType = {this.state.authType}
                    url = {this.state.url}
            />

            </Navbar>

        )
    }

}

export default Navigationbar;

