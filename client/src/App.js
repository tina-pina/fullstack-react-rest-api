import React, { Component } from 'react';
import './App.css';
import Courses from './Components/Courses';
import Header from './Components/Header';
import UserSignUp from './Components/UserSignUp';
import UserSignIn from './Components/UserSignIn';
import CourseDetail from './Components/CourseDetail';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';
import NotFound from './Components/NotFound';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from 'react-private-route'

class App extends Component {

  // Update the React App component to call the REST API to get a list of courses and render the results.
  constructor() {
    super();
    this.state = {
      userLoggedIn: false,
      userName: "",
      userEmail: "",
      userPassword: "",
      userId: "",
      courses: ""
    }
    // this.updateUserLoggedIn = this.updateUserLoggedIn.bind(this);
    this.signOutClicked = this.signOutClicked.bind(this);
    this.updateUserAuthentication = this.updateUserAuthentication.bind(this);
    this.getCourses = this.getCourses.bind(this)
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  isLoggedIn() {
    return this.state.userLoggedIn;
  }

  getCourses = (courses) => {
    this.setState({ courses: courses })
  }

  updateUserAuthentication(value, username, email, password, id) {
    this.setState({ userLoggedIn: value, userName: username, userEmail: email, userPassword: password, userId: id })
  }

  signOutClicked(ev, value, name) {
    ev.preventDefault()
    // console.log("clicked")
    this.setState({ userLoggedIn: value, userName: name })
  }

  render() {

    return (
      <BrowserRouter>
        <div>
          <Header
            userLoggedIn={this.state.userLoggedIn}
            userName={this.state.userName}
            signOut={this.signOutClicked} />
          <Switch>
            <Route exact path="/"
              render={() => <Courses getCourses={this.getCourses} />} />

            {/* component={Courses} /> */}
            <Route exact path="/signup" render={() => <UserSignUp userAuthentication={this.updateUserAuthentication} />} />
            <Route exact path="/signin" render={() => <UserSignIn userAuthentication={this.updateUserAuthentication} />} />
            <PrivateRoute
              exact
              path="/courses/create"
              component={CreateCourse}
              courses={this.state.courses}
              username={this.state.userEmail}
              password={this.state.userPassword}
              userId={this.state.userId}
              isAuthenticated={this.state.userLoggedIn}
              redirect="/signin"
            />
            <Route exact path="/courses/:id"
              render={() => <CourseDetail username={this.state.userEmail} userId={this.state.userId}
                password={this.state.userPassword} />} />
            <PrivateRoute
              exact
              path='/courses/:id/update'
              component={UpdateCourse}
              username={this.state.userEmail}
              password={this.state.userPassword}
              courses={this.state.courses}
              userId={this.state.userId}
              isAuthenticated={this.state.userLoggedIn}
              redirect="/signin"
            />
            {/* 
            <Route exact path="/courses/:id/update"
              render={() => <UpdateCourse username={this.state.userEmail} password={this.state.userPassword} />} /> */}
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
