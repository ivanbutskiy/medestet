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
                <h5 className='text-center mt-4'>Виберіть доступний урок з модуля і починайте проходження курсу</h5>
                <p className='text-center text-muted'>Модулі та уроки, які ще не доступні для проходження, неактивні при натисканні</p>
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