import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
let base64 = require('base-64');

class CreateCourse extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formValues: {
                title: "",
                description: "",
                estimatedTime: "",
                materialsNeeded: "",
                courseOwner: ""
            },
            userId: this.props.userId,
            validationErrors: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        let username = this.props.username
        let password = this.props.password
        fetch("http://localhost:5000/api/users", {
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + base64.encode(username + ":" + password),
                'Content-Type': 'application/json'
            }
        })
        .then(res=> res.json())
        .then(user => {
            let firstName = (user.firstName) ? user.firstName : ""
            let lastName = (user.lastName) ? user.lastName : ""
            this.setState({courseOwner: firstName + " " + lastName})
        })
    }


    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        let formValues = this.state.formValues;

        formValues[name] = value;
        this.setState({ formValues: formValues })
    }

    handleCancel(event) {
        this.props.history.push("/");
    }

    handleSubmit(event) {

        let username = this.props.username
        let password = this.props.password

        fetch("http://localhost:5000/api/courses", {
            method: "POST",
            headers: {
                'Authorization': 'Basic ' + base64.encode(username + ":" + password),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.formValues.title,
                description: this.state.formValues.description,
                user: this.state.userId,
                estimatedTime: this.state.formValues.estimatedTime,
                materialsNeeded: this.state.formValues.materialsNeeded
            })
        })
        .then(res => {

            if(res.status === 400 || res.status === 401) {

                res.json().then(jsonRes => {
                    this.setState({ validationErrors: jsonRes.errors })
                    throw Error(jsonRes.statusText);
                })
                .catch(error => {
                    console.log('Error fetching and parsing data', error);
                });
                
            } else {

                /* find course id just created */
                let headers = new Headers();
                headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
                fetch('http://localhost:5000/api/courses', { headers: headers, method: 'GET' })
                .then(response => response.json())
                .then(courseData => { 
                    
                    let courseId = courseData.filter(course => 
                        course.title === this.state.formValues.title &&
                        course.description === this.state.formValues.description && 
                        course.user === this.state.userId)[0]._id.toString()

                    this.props.history.push(`/courses/${courseId}`)

                }) 
            }
        })
        .catch(error => {
            console.log('Error fetching and parsing data', error);
        });

        event.preventDefault();
    }


    render() {

        let errHeader = (this.state.validationErrors) ?
            <h2 className="validation--errors--label">Validation errors</h2> : <h2></h2>
        let errMsg = (this.state.validationErrors) ? (
            <div className="validation-errors">
                <ul>
                    {this.state.validationErrors.map((err, index) => <li key={index}>{err}</li>)}
                </ul>
            </div>
        ) : <div></div>


        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    <div>
                        {errHeader}
                        {errMsg}
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                                    value={this.state.formValues.title} onChange={this.handleChange}></input></div>
                                <p>By {this.state.courseOwner}</p>
                            </div>
                            <div className="course--description">
                                <div><textarea id="description" name="description" className="" placeholder="Course description..." value={this.state.formValues.description} onChange={this.handleChange}></textarea ></div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                                            placeholder="Hours" value={this.state.formValues.estimatedTime} onChange={this.handleChange}></input></div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={this.state.formValues.materialsNeeded} onChange={this.handleChange}></textarea></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Create Course</button>
                            <button className="button button-secondary" type="button" onClick={this.handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

export default withRouter(CreateCourse);