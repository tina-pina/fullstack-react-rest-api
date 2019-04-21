import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
const ReactMarkdown = require('react-markdown')
let base64 = require('base-64');


class CourseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: {},
            deleteErrors: null,
            userId: this.props.userId
        }
        this.deleteHandler = this.deleteHandler.bind(this)

    }

    componentDidMount() {
        const { id } = this.props.match.params;

        if (id !== "create") {
            fetch(`http://localhost:5000/api/courses/${id}`)
                .then(response => response.json())
                .then(course => {

                    this.setState({ course: course })
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
            .then(response => response.json())
            .then(res => {
                console.log(res)
                if (res.errors) {
                    this.setState({ deleteErrors: res.errors })
                    throw Error("remove failed")
                }
                else {
                    this.props.history.push("/");
                }
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });

    }


    render() {

        const { id } = this.props.match.params;

        /* error Handler Validation */
        let errHeader = (this.state.deleteErrors) ?
            <h2 className="validation--errors--label">Validation errors</h2> : <h2></h2>
        let errMsg = (this.state.deleteErrors) ? (
            <div className="validation-errors">
                <ul>
                    {this.state.deleteErrors.map((err, index) => <li key={index}>{err}</li>)}
                </ul>
            </div>
        ) : <div></div>

        /* decide if update course and delete course button is displayed */
        let buttonsForOwners = (this.state.course.user === this.state.userId) ? (<span>
            <NavLink className="button" to={`${id}/update`}>Update Course</NavLink>
            <NavLink className="button" to={"/"} onClick={this.deleteHandler}>Delete Course</NavLink>
        </span>) : <span></span>


        return (

            <div>
                <div>
                    <div className="actions--bar">
                        <div className="bounds">
                            <div className="grid-100">
                                {buttonsForOwners}
                                <NavLink className="button button-secondary" to={"/"}>Return to List</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="bounds course--detail">
                        <div>
                            {errHeader}
                            {errMsg}
                        </div>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <h3 className="course--title">{this.state.course.title}</h3>
                                <p>By Anonymous</p>
                            </div>
                            <div className="course--description">
                                <ReactMarkdown source={this.state.course.description} />

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
                                        <ReactMarkdown source={this.state.course.materialsNeeded} />
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