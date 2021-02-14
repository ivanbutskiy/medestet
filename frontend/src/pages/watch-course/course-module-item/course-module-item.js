import React, { Component } from 'react';
import CourseLessonItem from '../course-lesson-item';

import './course-module-item.css';

export default class CourseModuleItem extends Component {

    state = {
        module: this.props.module,
        moduleNum: this.props.moduleNum,
        courseSlug: this.props.courseSlug,
        lessonsItems: ''
    };

    getLessonItems() {
        this.setState({
            lessonsItems: this.state.module.lesson.map(lesson => {
                return <CourseLessonItem 
                    lesson={ lesson } 
                    courseSlug={ this.state.courseSlug }
                    key={ lesson.id } />
            })
        })
    };

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({ 
                module: this.props.module,
                courseSlug: this.props.courseSlug });
            this.getLessonItems();
        };
    };

    componentDidMount() {
        this.setState({ 
            module: this.props.module,
            courseSlug: this.props.courseSlug });
        this.getLessonItems();
    };

    render() {

        const { module, moduleNum, lessonsItems } = this.state;

        return (
            <div className='card course-module-item'>
                <div id={ moduleNum } className='card-header bg-white shadow-sm border-0'>
                    <h3 className='mb-0'>
                        <button 
                            type='button' 
                            data-toggle='collapse' 
                            data-target={`#collapse${moduleNum}`} 
                            aria-expanded='false' 
                            aria-controls='collapseOne' 
                            className='btn btn-link course-module-link'
                            disabled={ !module.is_active ? true : false }>{ moduleNum }. { module.title }</button>
                    </h3>
                </div>
                <div id={`collapse${moduleNum}`} aria-labelledby='headingOne' data-parent='#accordionExample' className='collapse'>
                    <div className='card-body p-5'>
                        { lessonsItems }
                    </div>
                </div>
            </div>
        );
    };
};