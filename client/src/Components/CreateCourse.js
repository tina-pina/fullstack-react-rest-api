import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
let base64 = require('base-64');

class CreateCourse extends Component {

    constructor(props) {
        super(props);

        // let userId = this.props.userId
        console.log(this.props)
        this.state = {
            formValues: {
                title: "",
                description: "",
                estimatedTime: "",
                materialsNeeded: "",
            },
            userId: this.props.userId

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // componentDidMount() {
    //     this.props.isAuthenticated("true", this.props.username)
    // }

    handleChange(event) {
        console.log(this.props)
        let name = event.target.name;
        let value = event.target.value;
        let formValues = this.state.formValues;

        formValues[name] = value;
        this.setState({ formValues: formValues })
        console.log("WHATS HERE", this.state.userId)

    }

    handleSubmit(event) {

        let username = this.props.username
        let password = this.props.password

        fetch(`http://localhost:5000/api/courses`, {
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
            .then(res => res.json())
            .then(course => {
                console.log(course)
                this.props.history.push(`/courses/${course._id}`);
            })

            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });

        event.preventDefault();
    }


    render() {

        console.log(this.props.userId)


        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    <div>
                        <h2
                            className="validation--errors--label">Validation errors</h2>
                        <div className="validation-errors">
                            <ul>
                                <li>Please provide a value for "Title"</li>
                                <li>Please provide a value for "Description"</li>
                            </ul>
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                                    value={this.state.formValues.title} onChange={this.handleChange}></input></div>
                                <p>By Anonymous</p>
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
                        <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><button className="button button-secondary">Cancel</button></div>
                    </form>
                </div>
            </div>

        )
    }
}

export default withRouter(CreateCourse);