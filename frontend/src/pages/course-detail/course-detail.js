import React, { Component } from 'react';

import MedestetService from '../../service/medestet-service';
import './course-detail.css';

import Header from './header';
import ShortDescription from './short-description';
import Persons from './persons';
import DetailDescription from './detail-description';
import Program from './program';
import Results from './results';

import Spinner from '../../components/spinner';

class CourseDetail extends Component {

    service = new MedestetService();

    state = {
        title: '',
        subtitle: '',
        startingDate: '',
        price: '',
        headerImage: '',

        shortDescription: '',
        previewImage: '',

        persons: [],
        
        modules: '',
        
        results: '',

        certificate: null,
        certificateImage: '',

        error: false,

        loaded: false,

    };

    getCourse() {
        this.service.getCourseDetail(this.props.slug)
            .then((course) => {
                if (course.statusText === 'OK') {
                    this.setState({
                        title: course.data.title,
                        subtitle: course.data.subtitle,
                        startingDate: course.data.starting_date,
                        price: course.data.price,
                        headerImage: course.data.header_image,
                        shortDescription: course.data.short_description,
                        previewImage: course.data.preview_image,

                        persons: course.data.person,

                        detailDescription: course.data.detail_description,
                        detailImage: course.data.detail_image,

                        modules: course.data.module,

                        results: course.data.results,

                        certificate: course.data.certificate,
                        certificateImage: course.data.certificate_image

                    });
                    this.setState({loaded: true});
                } else {
                    this.setState({ error: true })
                }
            });
    };

    componentDidMount() {
        this.getCourse();
    };

    render() {

        const { loaded } = this.state;

        if (!loaded) {
            return <Spinner />
        };

        return (
            <div className='course-detail shadow-lg  justify-content-center'>
                
                <Header 
                    title={ this.state.title }
                    subtitle={ this.state.subtitle }
                    startingDate={ this.state.startingDate }
                    price={ this.state.price }
                    headerImage={ this.state.headerImage }
                />

                <ShortDescription
                    title={ this.state.title }
                    shortDescription={ this.state.shortDescription }
                    previewImage={ this.state.previewImage }
                />

                <Persons 
                    persons={ this.state.persons }
                />

                <DetailDescription 
                    detailDescription={ this.state.detailDescription }
                    detailImage={ this.state.detailImage }
                />

                <Program 
                    modules={ this.state.modules }
                />

                <Results 
                    results={ this.state.results }
                    certificate={ this.state.certificate }
                    certificateImage={ this.state.certificateImage } />

            </div>
        );
    };
};

export default CourseDetail;

// TODO реализовать систему оплаты, уведомлений и все, что с ней связано
// TODO добавить накопительную систему и чтобы человек видел, сколько ему осталось до накопления следующих бонусов