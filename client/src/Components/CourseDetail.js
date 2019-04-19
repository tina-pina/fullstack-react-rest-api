import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
let base64 = require('base-64');


class CourseDetail extends Component {
    constructor() {
        super();
        this.state = {
            course: {},
            userID: ""
        };
        this.deleteHandler = this.deleteHandler.bind(this)
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        if (id !== "create") {
            fetch(`http://localhost:5000/api/courses/${id}`)
                .then(response => response.json())
                .then(course => {
                    // console.log("this is course", course)
                    this.setState({ course: course, userID: course.user })
                })
                .catch(error => {
                    console.log('Error fetching and parsing data', error);
                });
        }
    }

    deleteHandler(event) {

        const { id } = this.props.match.params;

        let username = this.props.username
        console.log(username)
        let password = this.props.password

        event.preventDefault();

        fetch(`http://localhost:5000/api/courses/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Basic ' + base64.encode(username + ":" + password),
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.status === 204) throw Error("remove failed")
                else {
                    this.props.history.push("/");
                }
            })

    }


    render() {

        const { id } = this.props.match.params;
        let materialsLis;
        if (this.state.course.materialsNeeded && this.state.course.materialsNeeded.includes("*")) {
            let materialsNeeded = this.state.course.materialsNeeded
            materialsLis = materialsNeeded
                .split("*")
                .slice(1)
                .map((elem, id) => <li key={id}>{elem}</li>)
        } else {
            materialsLis = <li>{this.state.course.materialsNeeded}</li>
        }

        return (

            <div>
                <div>
                    <div className="actions--bar">
                        <div className="bounds">
                            {/* <div className="grid-100">
                                <span><a className="button" href="update-course.html">Update Course</a><a className="button" href="#">Delete Course</a></span>
                                <a className="button button-secondary" href="index.html">Return to List</a>
                            </div> */}
                            <div className="grid-100">
                                <span><NavLink className="button" to={`${id}/update`}>Update Course</NavLink><NavLink className="button" to={"/"} onClick={this.deleteHandler}>Delete Course</NavLink></span>
                                <NavLink className="button button-secondary" to={"/"}>Return to List</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="bounds course--detail">
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <h3 className="course--title">{this.state.course.title}</h3>
                                <p>By Anonymous</p>
                            </div>
                            <div className="course--description">
                                {
                                    this.state.course.description
                                }
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <h3>{this.state.course.estimatedTime}</h3>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <ul>
                                            {materialsLis}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CourseDetail);