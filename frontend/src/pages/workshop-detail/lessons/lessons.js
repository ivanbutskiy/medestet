import React, { Component } from 'react';

import LessonItem from '../lesson-item';

import './lessons.css';

class Lessons extends Component {

    state = {
        lessons: '',
        lessonItems: ''
    };

    getLessonItems() {
        this.setState({
            lessonItems: this.props.lessons.map((lesson) => {
                return <LessonItem 
                    key={ lesson.id }
                    title={ lesson.title }
                    shortDescription={ lesson.short_description }
                    startingDate={ lesson.starting_date }
                />
            })
        })
    };

    componentDidMount() {
        this.setState({ lessons: this.props.lessons });
        this.getLessonItems();
    };

    render() {

        const { lessonItems } = this.state;

        return (
            <div className='workshop-lessons container'>
                <h2>Програма</h2>

                <div className='row'>
                    <div className='col-lg-7 mx-auto mb-5'>
                        
                        <ul className='timeline mt-5 mb-5'>

                            { lessonItems }
                            
                        </ul>
                    </div>
                </div>
            </div>
        );
    };
};

export default Lessons;