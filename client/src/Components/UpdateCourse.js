import React, { Component } from 'react';

let base64 = require('base-64');



class UpdateCourse extends Component {

    constructor() {
        super();
        this.state = {
            formValues: {},
            //course: {},
            user: "",
            title: "",
            description: "",
            estimatedTime: "",
            materialsNeeded: ""
        };
    }

    componentDidMount() {
        // console.log(this.props.match.params)
        const { id } = this.props.match.params

        fetch(`http://localhost:5000/api/courses/${id}`)
            .then(response => response.json())
            .then(course => {
                // console.log(course)
                this.setState({ title: course.title, description: course.description, estimatedTime: course.estimatedTime, materialsNeeded: course.materialsNeeded })
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    handleChange(event) {
        event.preventDefault();
        let formValues = this.state.formValues;
        let name = event.target.name;
        let value = event.target.value;

        formValues[name] = value;

        this.setState({ formValues })
    }

    handleSubmit(event) {

        const courses = this.props.courses

        let newArr = []

        courses.map(course => {
            return
            if (course.includes(this.state.title)) {
                newArr.push(course)
            }
        })

        console.log(newArr)



        const { id } = this.props.match.params;

        let username = this.props.username
        let password = this.props.password

        let headers = new Headers();

        headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
        fetch(`http://localhost:5000/api/courses/${id}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify({
                // "user": this.props.username,
                "title": this.state.title,
                "description": this.state.description,
                "estimatedTime": this.state.estimatedTime,
                "materialsNeeded": this.state.materialsNeeded
            })
        })
            .then(response => response.json())
            .then(course => {
                console.log("specific course", course)
                // this.setState({ course: course })
                this.setState({ title: this.state.formValues.title, description: this.state.formValues.description, estimatedTime: this.state.formValues.estimatedTime, materialsNeeded: this.state.formValues.materialsNeeded })
                // console.log(this.state)
            })
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
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder={this.state.title} onChange={this.handleChange.bind(this)}></input></div>
                                <p>By Anonymous</p>
                            </div>
                            <div className="course--description">
                                <div><textarea id="description" name="description" className="" placeholder={this.state.description} onChange={this.handleChange.bind(this)}></textarea></div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                                            placeholder={this.state.estimatedTime} onChange={this.handleChange.bind(this)}></input></div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder={this.state.materialsNeeded} onChange={this.handleChange.bind(this)}></textarea>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary">Cancel</button></div>
                    </form>
                </div>
            </div>
        )
    }



}

export default UpdateCourse;