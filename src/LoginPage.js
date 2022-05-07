import React from "react";
import {Input} from "./Input Class";
import "./LoginCss.css"
import"./App.css"
import {load_page} from "./index";
import {send_and_receive} from "./API";
import {set_credentials} from "./API";
import App from "./App";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {Message: ""}
        this.userRef = React.createRef()
        this.passRef = React.createRef()
        this.messageRef = React.createRef()
        this.handle_response.bind(this)
        this.counter = null
        this.currentUsername = null
    }

    show_message = (message) =>{
        if (this.counter != null) clearTimeout(this.counter)
        this.counter = setTimeout(this.clear_message, 1500)

        this.setState( (state) => ({
            Message: message
        }))
    }

    clear_message = () => {
        this.setState( (state) => ({
            Message: ""
        }))
    }

    componentWillUnmount() {
        clearTimeout(this.counter)
    }

    submit_data = () => {
        let user = this.userRef.current.flushData(false)
        let pass = this.passRef.current.flushData(true)
        let data = {Username: user, Password: pass}
        this.currentUsername = user
        return data
    }

    send_data = () => {
        let data = this.submit_data()
        send_and_receive(data, "Login", this.handle_response, false)
    }

    handle_response = (response) => {
        if (response.Status === "ERROR") {
            this.show_message("Wrong username or password")
            return
        }
        set_credentials(response.Response, this.currentUsername)
        load_page(<App/>)
    }

    render() {
        return (
            <div className={"loginClass"}>
                <Input ref={this.userRef} mainClass={"InpContainer"} labelClass={"labelClass"}
                       labelData={"Username"} inpClass={"InpBox"} placeH={"Username"} Type={"text"}> </Input>
                <Input ref={this.passRef} mainClass={"InpContainer"} labelClass={"labelClass"}
                       labelData={"Password"} inpClass={"InpBox"} placeH={"Password"} Type={"Password"}> </Input>
                <div className={"buttonCont"}>
                    <button onClick={this.send_data} className={"buttonClass"}> Login </button>
                    <div ref={this.messageRef}> {this.state.Message} </div>
                    <button className={"buttonClass"} onClick={this.props.CallBack}>Switch</button>
                </div>
            </div>
        );
    }
}

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {Message: ""}
        this.userRef = React.createRef()
        this.passRef = React.createRef()
        this.passConfRef = React.createRef()
        this.messageRef = React.createRef()
        this.switch_counter = null
    }

    show_message = (message) =>{
        if (this.counter != null) clearTimeout(this.counter)
        this.counter = setTimeout(this.clear_message, 1500)
        this.setState( (state) => ({
            Message: message
        }))
    }

    clear_message = () => {
        this.setState( (state) => ({
            Message: ""
        }))
    }

    componentWillUnmount() {
        clearTimeout(this.counter)
        clearTimeout(this.switch_counter)
    }

    check_pass = () => {
        let pass = this.passRef.current.flushData(false)
        let passConf = this.passConfRef.current.flushData(false)

        return pass === passConf
    }

    submit_data = () => {
        if (!this.check_pass()) {
            this.show_message("Password is not confirmed")
            return
        }
        let user = this.userRef.current.flushData(false)
        let pass = this.passRef.current.flushData(false)
        let data = {Username: user, Password: pass}
        return data
    }

    send_data = () => {
        let data = this.submit_data()
        send_and_receive(data, "Register", this.handle_response, false)
    }

    handle_response = (response) => {
        if (response.Status === "ERROR") {
            this.show_message("Username already exists")
            return
        }
        this.show_message("Registered!")
        this.switch_counter = setTimeout(this.props.CallBack, 800)
    }

    render() {
        return (
            <div className={"regClass"}>
                <Input ref={this.userRef} mainClass={"InpContainer"} labelClass={"labelClass"}
                       labelData={"Username"} inpClass={"InpBox"} placeH={"Username"} Type={"text"}> </Input>
                <Input ref={this.passRef} mainClass={"InpContainer"} labelClass={"labelClass"}
                       labelData={"Password"} inpClass={"InpBox"} placeH={"Password"} Type={"Password"}> </Input>
                <Input ref={this.passConfRef} mainClass={"InpContainer"} labelClass={"labelClass"}
                       labelData={"Confirm Password"} inpClass={"InpBox"} placeH={"Confirm Password"} Type={"Password"}> </Input>
                <div className={"buttonCont"}>
                    <button onClick={this.send_data} className={"buttonClass"}> Register </button>
                    <div ref={this.messageRef}> {this.state.Message} </div>
                    <button className={"buttonClass"} onClick={this.props.CallBack}>Switch</button>
                </div>
            </div>
        );
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {LoginMode: true}
    }

    switch_mode = () => {
        this.setState( (state) => ({
            LoginMode: !state.LoginMode
        }) )
    }

    render() {
        return (
            <div className={"mainClass"}>
                {this.state.LoginMode ? <Login CallBack={this.switch_mode}/> : <Register CallBack={this.switch_mode}/>}
            </div>
        );
    }
}

function Page() {
    return(
        <div className="App">
            <Main> </Main>
        </div>
    )
}
export default Page