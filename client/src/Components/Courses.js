import React, { Component } from 'react';

class Courses extends Component {

    constructor() {
        super();
        this.state = {
            coursesList: []
        };
    }

    getCourses() {

        fetch('http://localhost:5000/api/courses')
            .then(response => response.json())
            .then(coursesListData => {
                console.log(coursesListData)
                this.setState({ coursesList: coursesListData })
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    componentDidMount() {
        this.getCourses();
    }

    render() {
        return (
            <div className="bounds">
                {
                    this.state.coursesList.map((item, idx) => (
                        <div className="grid-33" key={item._id}>
                            <a className="course--module course--link" href="course-detail.html">
                                <h4 className="course--label">Course</h4>
                                <h3 className="course--title">{item.title}</h3>
                            </a>
                        </div>
                    ))
                }
                <div className="grid-33">
                    <a className="course--module course--add--module" href="create-course.html">
                        <h3 className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                viewBox="0 0 13 13" className="add">
                                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                            </svg>New Course</h3>
                    </a>
                </div>
            </div>
)
    }
}
        
export default Courses;