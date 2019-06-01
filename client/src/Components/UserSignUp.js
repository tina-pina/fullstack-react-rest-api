import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
let base64 = require('base-64');

class UserSignUp extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            confirmPassword: "",
            errors: null
        };

        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeCancel = this.handleChangeCancel.bind(this);
    }

    handleSubmit(event) {

        let errorMsgs = []
        if (!this.state.firstName) errorMsgs.push("Please provide a value for \"firstName\"")
        if (!this.state.lastName) errorMsgs.push("Please provide a value for \"lastName\"")
        if (!this.state.username) errorMsgs.push("Please provide a value for \"username\"")
        if (!this.state.password) errorMsgs.push("Please provide a value for \"password\"")
        if (!this.state.confirmPassword) errorMsgs.push("Please provide a value for \"confirmPassword\"")
        if (this.state.password !== this.state.confirmPassword) errorMsgs.push("Please provide the same value for \"password\" & \"confirmPassword\"")

        if (errorMsgs.length !== 0) {
            this.setState({ "errors": errorMsgs })
        }
        else {
            fetch("http://localhost:5000/api/users", {
                method: "POST",
                body: JSON.stringify({
                    "firstName": this.state.firstName,
                    "lastName": this.state.lastName,
                    "emailAddress": this.state.username,
                    "password": this.state.password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(() => {

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

            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
        }

        event.preventDefault()
    }




    handleFirstName(event) {
        let firstName = event.target.value;
        this.setState({ firstName: firstName })
        console.log(this.state.firstName)
    }

    handleLastName(event) {
        let lastName = event.target.value;
        this.setState({ lastName: lastName })
    }

    handleEmail(event) {
        let username = event.target.value;
        this.setState({ username: username })
    }

    handlePassword(event) {
        let password = event.target.value;
        this.setState({ password: password })
    }

    handleConfirmPassword(event) {
        let confirmPassword = event.target.value;
        this.setState({ confirmPassword: confirmPassword })
    }

    handleChangeCancel(event) {
        this.props.history.push('/');
        event.preventDefault();
    }

    render() {

        let errorMsg = (this.state.errors) ? <div>{this.state.errors.map((error, index) => <p key={index}>{error}</p>)}</div> : <div></div>

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    {errorMsg}
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={this.handleFirstName}></input></div>
                            <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={this.handleLastName}></input></div>
                            <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.handleEmail}></input></div>
                            <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.handlePassword}></input></div>
                            <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" onChange={this.handleConfirmPassword}
                            ></input></div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign Up</button>
                                <button className="button button-secondary" onClick={this.handleChangeCancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <a href="signin">Click here</a> to sign in!</p>
                </div>
            </div>
        )
    }
}

export default withRouter(UserSignUp);