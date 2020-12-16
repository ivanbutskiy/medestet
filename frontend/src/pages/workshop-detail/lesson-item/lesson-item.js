import React, { Component } from 'react';

import './lesson-item.css'

class LessonItem extends Component {

    state = {
        title: this.props.title,
        shortDescription: this.props.shortDescription,
        startingDate: this.props.startingDate
    }

    render() {
        
        const { title, shortDescription, startingDate } = this.state;

        return (
            
            <li className='timeline-item bg-white rounded ml-3 p-4 shadow'>
                <div className='timeline-arrow'></div>
                <h4 className='h5 mb-0'>{ title }</h4>

                <p><i className='fas fa-calendar-week mr-2 mt-4 course-detail-info'></i>{ startingDate }</p>

                <p className='lesson-description mt-3 font-weight-light'>{ shortDescription }</p>
            </li>

        );
    };
};

export default LessonItem;