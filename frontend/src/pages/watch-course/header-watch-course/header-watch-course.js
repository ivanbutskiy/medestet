import React, { Component } from 'react';

import './header-watch-course.css';

class HeaderWatchCourse extends Component {
    
    render() {

        return (
            <div 
                className='shadow-sm card header-watch-course'
                style={{ backgroundImage:`url(${this.props.headerImage})` }}>
                <div className='row container'>
                    <div className='col-md-10'>
                        <h1>{ this.props.title }</h1>
                    </div>
                </div>
            </div>
        );
    };
};

export default HeaderWatchCourse;
