import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './courses.css';

class Courses extends Component {

    render() {

        return (
            <div className='personal-data col-sm-6 col-md-4 text-center'>
                <div className='card shadow-sm p-3'>
                    <i className='fas fa-chalkboard-teacher'></i>
                    <Link to='/account/courses/'>Мои курсы</Link>
                </div>
            </div>
        );
    };
};

export default Courses;