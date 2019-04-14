import React, { Component } from 'react';
import './App.css';
import Courses from './Components/Courses';
import Header from './Components/Header';
import UserSignUp from './Components/UserSignUp';
import UserSignIn from './Components/UserSignIn';


import { BrowserRouter, Route, Switch } from 'react-router-dom';


class App extends Component {

  // Update the React App component to call the REST API to get a list of courses and render the results.

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Courses} />
            <Route exact path="/sign-up" component={UserSignUp} />
            <Route exact path="/sign-in" component={UserSignIn} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
