import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';

class Header extends Component {
    constructor() {
        super();
        this.headerLinks = this.headerLinks.bind(this)
    }

    callSignOut(event) {
        this.props.signOut(event, false, "")
    }

    headerLinks() {
        if (this.props.userLoggedIn) {
            return (
                <nav>
                    <span>Welcome {this.props.userName}!</span>
                    <NavLink className="signout" to={"/signin"} onClick={this.callSignOut}>Sign Out</NavLink>
                </nav>
            )
        }
        else {
            return (
                <nav>
                    <NavLink className="signup" exact to="/signup">Sign Up</NavLink>
                    <NavLink className="signin" exact to="/signin">Sign In</NavLink>
                </nav>
            )
        }
    }

    render() {
        return (
            <div className="header">
                <div className="bounds">
                    <h1 className="header--logo">Courses</h1>
                    {this.headerLinks()}
                </div>
            </div>
        )
    }
}

export default Header;