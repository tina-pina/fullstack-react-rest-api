import React, { Component } from 'react';

class UserSignUp extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            confirmPassword: ""
        };

        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {

        if ((!this.state.firstName
            || !this.state.lastName
            || !this.state.username
            || !this.state.password
            || !this.confirmPassword)
            && (this.state.password !== this.state.confirmPassword)) {
            console.log(this.state.firstName, this.state.lastName, this.state.username, this.state.password, this.confirmPassword)
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
                .then(response => response.json())
                .then(userData => {
                    console.log("this is userData", userData)
                })
                .catch(error => {
                    console.log('Error fetching and parsing data', error);
                });

            /* ToDO redirect user to main screen */

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

    render() {
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={this.handleFirstName}></input></div>
                            <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={this.handleLastName}></input></div>
                            <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.handleEmail}></input></div>
                            <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.handlePassword}></input></div>
                            <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" onChange={this.handleConfirmPassword}
                            ></input></div>
                            <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary">Cancel</button></div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <a href="signin">Click here</a> to sign in!</p>
                </div>
            </div>
        )
    }
}

export default UserSignUp;