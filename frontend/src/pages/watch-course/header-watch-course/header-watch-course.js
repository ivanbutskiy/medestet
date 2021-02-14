import React, { Component } from 'react';

import './header-watch-course.css';

class HeaderWatchCourse extends Component {
    
    render() {

        return (
            <div 
                className='jumbotron shadow-sm card header-watch-course'
                style={{ backgroundImage:`url(${this.props.headerImage})` }}>
                <h1>{ this.props.title }</h1>
            </div>
        );
    };
};

export default HeaderWatchCourse;
