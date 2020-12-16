import React, { Component } from 'react';

import './lesson-item.css'

class LessonItem extends Component {

    state = {
        lessonTitle: this.props.lessonTitle
    };

    render() {

        const { lessonTitle } = this.state;

        return (
            <p className='lesson-item'>{ lessonTitle }</p>
        );
    };
};

export default LessonItem;