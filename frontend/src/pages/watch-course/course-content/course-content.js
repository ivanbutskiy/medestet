import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

import './course-content.css';

class CourseContent extends Component {

    state = {
        detailDescription: '',
        previewImage: ''
    };

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({ 
                detailDescription: this.props.detailDescription,
                previewImage: this.props.previewImage
            });
        };
    };

    componentDidMount() {
        this.setState({ 
            detailDescription: this.props.detailDescription,
            previewImage: this.props.previewImage
        });
    };

    render() {

        const { detailDescription, previewImage } = this.state;

        return (
            <div className='card shadow-sm course-content'>
                <h5 className='text-center mt-4'>Выберите доступный урок из модуля и начинайте прохождение курса</h5>
                <p className='text-center text-muted'>Модули и уроки, которые еще не доступны для прохождения, неактивны к нажатию</p>
                <hr className='mt-3 mb-5'></hr>
                <div className='row align-items-center'>
                    <div className='col-md-7'>
                        { ReactHtmlParser(detailDescription) }
                    </div>
                    <div className='col-md-5'>
                        <img src={ previewImage } alt='Medestet course' />
                    </div>
                </div>
            </div>
        );
    };
};

export default CourseContent;