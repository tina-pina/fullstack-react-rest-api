

import React, { Component } from 'react';

let base64 = require('base-64');



class UpdateCourse extends Component {

    constructor() {
        super();
        this.state = {
            formValues: {
                title: "",
                description: "",
                estimatedTime: "",
                materialsNeeded: ""
            }
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {

        const { id } = this.props.match.params

        fetch(`http://localhost:5000/api/courses/${id}`)
            .then(response => response.json())
            .then(course => {
                // console.log(course)
                this.setState({
                    formValues: {
                        title: course.title,
                        description: course.description,
                        estimatedTime: course.estimatedTime,
                        materialsNeeded: course.materialsNeeded
                    }
                })
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    handleChange(event) {

        let name = event.target.name;
        let value = event.target.value;
        let formValues = this.state.formValues;

        formValues[name] = value
        this.setState({ formValues: formValues })
    }

    handleSubmit(event) {

        const { id } = this.props.match.params;
        let username = this.props.username
        let password = this.props.password
        //console.log(username, password)

        fetch(`http://localhost:5000/api/courses/${id}`, {
            method: "PUT",
            headers: {
                'Authorization': 'Basic ' + base64.encode(username + ":" + password),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "_id": `${id}`,
                "title": this.state.formValues.title,
                "description": this.state.formValues.description,
                "estimatedTime": this.state.formValues.estimatedTime,
                "materialsNeeded": this.state.formValues.materialsNeeded,
                "user": this.props.userId
            })
        })
            .then(res => { console.log(res) })

            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });

        event.preventDefault();
    }

    render() {

        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        className="input-title course--title--input"
                                        placeholder="Course title..."
                                        value={this.state.formValues.title}
                                        onChange={this.handleChange}></input>
                                </div>
                                <p>By Anonymous</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea
                                        id="description"
                                        name="description"
                                        className=""
                                        placeholder="Course description..."
                                        value={this.state.formValues.description}
                                        onChange={this.handleChange}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input
                                                id="estimatedTime"
                                                name="estimatedTime"
                                                type="text"
                                                className="course--time--input"
                                                placeholder="Hours"
                                                value={this.state.formValues.estimatedTime}
                                                onChange={this.handleChange}></input>
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea
                                                id="materialsNeeded"
                                                name="materialsNeeded"
                                                className=""
                                                placeholder="List materials..."
                                                value={this.state.formValues.materialsNeeded}
                                                onChange={this.handleChange}></textarea>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Update Course</button>
                            <button className="button button-secondary">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }



}

export default UpdateCourse;

