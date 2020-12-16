import React, { Component } from 'react';

import LessonItem from '../lesson-item/';

import './lessons-list.css';


class LessonsList extends Component {
    
    state = {
        lessons: this.props.lessons,
        lessonList: ''
    };
    
    getLessonList() {
        this.setState({
            lessonList: this.props.lessons.map((lesson) => {
                return <LessonItem lessonTitle={ lesson.title } key={ lesson.id } />
            })
        });
    };

    componentDidUpdate(prevProps) {
        if (prevProps.lessons !== this.props.lessons) {
            this.getLessonList();
        };
    };

    componentDidMount() {
        this.getLessonList();
    };

    render() {

        const { lessonList } = this.state;

        return (
            <div className='mt-4'>
                { lessonList }
            </div>
        );
    };
};

export default LessonsList;