
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


let base64 = require('base-64');

class UserSignIn extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errors: null
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


        let errorMsgs = []
        if (!this.state.username) errorMsgs.push("Please provide a value for \"username\"")
        if (!this.state.password) errorMsgs.push("Please provide a value for \"password\"")

        if (errorMsgs.length !== 0) {
            this.setState({ "errors": errorMsgs })
        }

        else {
            let username = this.state.username
            let password = this.state.password

            let headers = new Headers();
            headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
            fetch('http://localhost:5000/api/users', { headers: headers, method: 'GET' })
                .then(response => response.json())
                .then(userData => {

                    if (userData.errors) {
                        this.setState({ "errors": userData.errors })
                    }
                    else {
                        this.props.userAuthentication(true, userData.firstName, username, password, userData._id)
                        this.props.history.push('/');
                    }

                })
                .catch(error => {
                    console.log('Error fetching and parsing data', error);
                });
        }

        event.preventDefault();
    }

    render() {

        let errorMsg = (this.state.errors) ? <div>{this.state.errors.map((error, index) => <p key={index}>{error}</p>)}</div> : <div></div>


        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    {errorMsg}
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
