import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


import { Route } from 'react-router-dom';

class Header extends Component {
    constructor() {
        super();
        this.state = {

        };
    }


    render() {



        return (
            <div className="header">
                <div className="bounds">
                    <h1 className="header--logo">Courses</h1>
                    <nav>
                        <NavLink className="signup" exact to="/signup">Sign Up</NavLink>
                        <NavLink className="signin" exact to="/signin">Sign In</NavLink>
                        {/* <NavLink className="signout" exact to="/">Sign Out</NavLink> */}
                    </nav>
                </div>
            </div>
        )
    }
}

export default Header;