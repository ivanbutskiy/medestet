import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './course-lesson-item.css';

export default class CourseLessonItem extends Component {

    state = {
        title: '',
        slugCourse: '',
        lessonId: '',
        moduleId: '',
        isActive: ''
    };

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({ 
                title: this.props.lesson.title,
                moduleId: this.props.lesson.module,
                lessonId: this.props.lesson.id,
                slugCourse: this.props.slugCourse,
                isActive: this.props.lesson.is_active
             });
        };
    };

    componentDidMount() {
        this.setState({ 
            title: this.props.lesson.title,
            moduleId: this.props.lesson.module,
            lessonId: this.props.lesson.id,
            slugCourse: this.props.slugCourse,
            isActive: this.props.lesson.is_active
        });
    };

    render() {

        const { 
            title,
            slugCourse,
            moduleId,
            lessonId,
            isActive } = this.state;

        return (
            <div className='mt-2 course-lesson-link'>
                {
                    isActive ? <Link 
                    to={`/account/courses/watch/${slugCourse}/${moduleId}/${lessonId}/`}>
                    { title }
                </Link> : <span>{ title }</span>
                }
            </div>
        );
    }
}