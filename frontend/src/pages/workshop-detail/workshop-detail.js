import React, { Component } from 'react';

import MedestetService from '../../service/medestet-service';
import Spinner from '../../components/spinner';

import Header from './header';
import Description from './description';
import Lessons from './lessons';
import Location from './location';
import Options from './options';

import './workshop-detail.css';

class WorkshopDetail extends Component {

    service = new MedestetService();

    state = {
        slug: this.props.slug,
        title: '',
        subtitle: '',
        headerImage: '',
        startingDate: '',

        description: '',
        descriptionImage: '',

        lessons: '',

        location: '',
        locationImage: '',

        options: '',

        error: false,
        loaded: false,
    };

    getWorkshop() {
        const { slug } = this.state;
        this.service.getWorkshopDetail(slug)
            .then((workshop) => {
                    this.setState({
                        title: workshop.data.title,
                        subtitle: workshop.data.subtitle,
                        headerImage: workshop.data.header_image,
                        startingDate: workshop.data.starting_date,
                        description: workshop.data.description,
                        descriptionImage: workshop.data.description_image,
                        location: workshop.data.location,
                        locationImage: workshop.data.location_image,
                        lessons: workshop.data.lesson,
                        options: workshop.data.option                        

                    });
                    this.setState({ loaded: true })
                })
            .catch (() => {
                this.setState({ loaded: true });
                this.setState({ error: true });
            });
    };

    componentDidMount() {
        this.getWorkshop();
    };

    render() {

        if (this.state.loaded === false) {
            return <Spinner />
        };

        if (this.state.error) {
            return <h1>Произошла ошибочка!</h1>
        };

        return (
            <div className='workshop-detail shadow-lg  justify-content-center'>

                <Header 
                    headerImage={ this.state.headerImage }
                    title={ this.state.title }
                    subtitle={ this.state.subtitle }
                    startingDate={ this.state.startingDate }
                />

                <Description 
                    description={ this.state.description }
                    descriptionImage={ this.state.descriptionImage }
                />

                <Lessons lessons={ this.state.lessons } />

                <Location 
                    location={ this.state.location }
                    locationImage={ this.state.locationImage }
                />

                <Options options={ this.state.options } />

            </div>
        );
    };
};

export default WorkshopDetail;

// TODO обработать ошибки: создать компонент ошибки и выдать его, а в CourseDetail изменить поведение промиса
// TODO добавить форму оплаты и записи