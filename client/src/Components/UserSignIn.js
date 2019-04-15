
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';


let base64 = require('base-64');

class UserSignIn extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this)
        this.handleChangeCancel = this.handleChangeCancel.bind(this)
    }

    handleEmail(event) {
        let username = event.target.value
        this.setState({ username: username })
    }

    handlePassword(event) {
        let password = event.target.value
        this.setState({ password: password })
    }

    handleChangeCancel(event) {
        this.props.history.push('/');
        event.preventDefault();
    }



    handleSubmit(event) {
        let username = this.state.username
        let password = this.state.password

        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
        fetch('http://localhost:5000/api/users', { headers: headers, method: 'GET' })
            .then(response => response.json())
            .then(userData => {
                console.log("this is userData", userData)
                this.props.userStateUpdate(true, userData.firstName)
                this.props.history.push('/');
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });

        /* ToDO redirect user to main screen */

        event.preventDefault();
    }

    render() {
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <input id="emailAddress" name="emailAddress" type="text" className="emailAddress" placeholder="Email Address" onChange={this.handleEmail}></input>
                        </div>
                        <div>
                            <input id="password" name="password" type="password" className="password" placeholder="Password" onChange={this.handlePassword}></input>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Sign In</button>
                            <button className="button button-secondary" onClick={this.handleChangeCancel}>Cancel</button>
                        </div>
                    </form>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <a href="signup">Click here</a> to sign up!</p>
                </div>
            </div>
        )
    }
}

export default withRouter(UserSignIn);
