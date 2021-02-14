import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

import './lesson-content.css';

class LessonContent extends Component {

    state = {
        id: '',
        title: '',
        description: '',
        materials: '',
    };

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                id: this.props.lesson.id,
                title: this.props.lesson.title,
                description: this.props.lesson.description,
                materials: this.props.lesson.materials,
                video: this.props.lesson.video,
                videoRecord: this.props.lesson.video_record,
            });
        };
    };

    componentDidMount() {
        this.setState({
            id: this.props.lesson.id,
            title: this.props.lesson.title,
            description: this.props.lesson.description,
            materials: this.props.lesson.materials,
            video: this.props.lesson.video,
            videoRecord: this.props.lesson.video_record,
            lessonError: this.props.lessonError,
            lessonLoading: this.props.lessonLoading
        });
    };

    render() {

        const {
            title,
            description,
            materials,
            video,
            videoRecord,
        } = this.state;

        return (<div className='card shadow-sm lesson-content pb-5'>
                    <h1>{ title }</h1>
                    <div className='mt-4'>
                        { ReactHtmlParser(description) }
                    </div>
                    
                    { video ? 
                        <div className='mt-4'>
                            <h5>Ссылка на трансляцию:</h5>
                            <a target='_blank' rel='noreferrer' href={ video }>{video}</a>
                        </div> : null }

                    { videoRecord ? 
                    <div className='mt-4'>
                        <h5>Запись урока:</h5>
                        <a target='_blank' rel='noreferrer' href={ videoRecord }>{ videoRecord }</a>
                    </div> : null }

                    { materials ? 
                    <div className='mt-4'>
                        <h5>Дополнительные материалы:</h5>
                        <a target='_blank' rel='noreferrer' href={ materials }>{ materials }</a>
                    </div> : null }
                    
                </div>
            );
    };
};

export default LessonContent;