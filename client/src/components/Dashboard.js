import React, { Component } from "react";
import Login from "./Login";
import Controls from "./Controls";


export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            error: "",
            auth: false,
            sk: ""
        };

        
    }


    handleUsernameChange(e) {
        e.preventDefault();
        this.setState({
            username: e.target.value
        })
    }
    handlePasswordChange(e) {
        e.preventDefault();
        this.setState({
            password: e.target.value
        })
    }
    handleSubmit(e) {
        //Auth

        //send a request to /login
        fetch('http://localhost:5000/login', {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({username: this.state.username, password: this.state.password})
        })
        .then(res => {
            if(res.status === 200) {
                this.setState({
                    auth: true
                })
            } else {
                this.setState({
                    error: 'username or password invalid.'
                })
            
            }
        })
        
    
    }

    Authenticated() {
        if (this.state.auth === true) {
            
                    return <Controls />
               
            
                
        } else {
            return (
                <Login
                    handleUsernameChange={this.handleUsernameChange.bind(this)}
                    handlePasswordChange={this.handlePasswordChange.bind(this)}
                    handleSubmit={this.handleSubmit.bind(this)}
                    username={this.state.username}
                    password={this.state.password}
                    error={this.state.error}
                />
            );
        }
    }

    render() {
        return (
            <div style={{position: 'relative'}}>
          

        {this.Authenticated()}
        </div>);
    }
}
