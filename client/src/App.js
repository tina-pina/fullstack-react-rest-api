import React, { Component } from 'react';
import './App.css';
import Courses from './Components/Courses';
import Header from './Components/Header';
import UserSignUp from './Components/UserSignUp';
import UserSignIn from './Components/UserSignIn';
import CourseDetail from './Components/CourseDetail';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';

import { BrowserRouter, Route, Switch } from 'react-router-dom';



class App extends Component {

  // Update the React App component to call the REST API to get a list of courses and render the results.
  constructor() {
    super();
    this.state = {
      userLoggedIn: false,
      userName: "",
      userEmail: "",
      userPassword: "",
      courses: ""
    }
    this.updateUserLoggedIn = this.updateUserLoggedIn.bind(this);
    this.signOutClicked = this.signOutClicked.bind(this);
    this.updateUserAuthentication = this.updateUserAuthentication.bind(this);
  }

  getUserIdCourses = (courses) => {
    console.log("courses", courses)
    this.setState({ courses: courses })
  }

  updateUserLoggedIn(value, name) {
    this.setState({ userLoggedIn: value, userName: name })
  }

  updateUserAuthentication(value, email, password) {
    this.setState({ userLoggedIn: value, userEmail: email, userPassword: password })
  }

  signOutClicked(ev, value, name) {
    ev.preventDefault()
    // console.log("clicked")
    this.setState({ userLoggedIn: value, userName: name })
  }

  render() {

    console.log("state", this.state)
    return (
      <BrowserRouter>
        <div>
          <Header
            userLoggedIn={this.state.userLoggedIn}
            userName={this.state.userName}
            signOut={this.signOutClicked} />
          <Switch>
            <Route exact path="/"
              render={() => <Courses getIdUsers={this.getUserIdCourses.bind(this)} />} />

            {/* component={Courses} /> */}
            <Route exact path="/signup" render={() => <UserSignUp userStateUpdate={this.updateUserLoggedIn} userAuthentication={this.updateUserAuthentication} />} />
            <Route exact path="/signin" render={() => <UserSignIn userStateUpdate={this.updateUserLoggedIn} userAuthentication={this.updateUserAuthentication} />} />
            <Route exact path="/courses/:id" component={CourseDetail} />
            <Route path='/courses/:id/update' render={(props) => <UpdateCourse {...props} username={this.state.userEmail} password={this.state.userPassword} courses={this.state.courses} />} />

            {/* <Route exact path="/courses/:id/update"
              render={() => <UpdateCourse username={this.state.userEmail} password={this.state.userPassword} />} /> */}
            <Route exact path="/courses/create" component={CreateCourse} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
