import React, { Component } from 'react';


class CourseDetail extends Component {
    constructor() {
        super();
        this.state = {
            course: {}
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`http://localhost:5000/api/courses/${id}`)
            .then(response => response.json())
            .then(course => {
                // console.log(course)
                this.setState({ course: course })
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }


    render() {
        let materialsLis;
        if (this.state.course.materialsNeeded) {
            let materialsNeeded = this.state.course.materialsNeeded
            materialsLis = materialsNeeded
                .split("*")
                .slice(1)
                .map((elem, id) => <li key={id}>{elem}</li>)
        }

        return (
            <div>

                <div>
                    <div className="actions--bar">
                        <div className="bounds">
                            <div className="grid-100"><span><a className="button" href="update-course.html">Update Course</a><a className="button" href="#">Delete Course</a></span><a
                                className="button button-secondary" href="index.html">Return to List</a></div>
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

export default CourseDetail;