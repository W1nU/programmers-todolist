import React, {Component} from 'react';
import {Button, Nav, Navbar} from 'react-bootstrap';
import SignInForm from '../Form/SignInForm';

class Navigationbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Buttons: [],
            inSignIn: false
        };
        this._setButtons();
    }

    _setInSignIn = () => {
        this.setState({inSignIn: true})
    }

    _setButtons = () => {
        if (this.props.isLogin === true) {
            this.state.Buttons.push(<Button id="loginButton" size="sm">로그아웃</Button>);
        } else {
            this.state.Buttons.push(<Button key="loginButton" id="loginButton" size="sm">
                로그인</Button>);
            this.state.Buttons.push(<div key="buttonSpace" id="buttonSpace">&nbsp;</div>);
            this.state.Buttons.push(<Button key="signinButton" id="signinButton" size="sm"
                                            onClick={this._setInSignIn}>회원가입</Button>);

        }
    };

    render() {
        let signInClose = () => this.setState({inSignIn: false});

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
                <SignInForm
                    show={this.state.inSignIn}
                    onHide={signInClose}/>
            </Navbar>

        )
    }

}

export default Navigationbar;

