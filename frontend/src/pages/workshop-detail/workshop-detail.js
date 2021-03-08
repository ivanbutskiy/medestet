import React, { Component } from 'react';

import MedestetService from '../../service/medestet-service';
import Spinner from '../../components/spinner';

import Header from './header';
import Description from './description';
import Lessons from './lessons';
import Location from './location';
import Options from './options';
import ErrorBanner from '../../components/error-banner';
import Register from './register';

import './workshop-detail.css';

class WorkshopDetail extends Component {

    service = new MedestetService();

    state = {
        id: '',
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
                        id: workshop.data.id,
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
                this.setState({ error: true });
                this.setState({ loaded: true });
            });
    };

    componentDidMount() {
        this.getWorkshop();
    };

    render() {

        const { error, loaded } = this.state;
        const { 
            id,
            headerImage,
            title,
            subtitle,
            startingDate,
            description,
            descriptionImage,
            lessons,
            location,
            locationImage,
            options
        } = this.state;

        if (error) {
            return (
                <div className='course-detail course-detail-error shadow-lg'>
                    <div className='spinner text-center'>
                        <ErrorBanner />
                    </div>
                </div>
            );
        };

        if (loaded === false) {
            return (
                <div className='course-detail course-detail-spinner shadow-lg'>
                    <div className='spinner text-center'>
                        <Spinner />
                    </div>
                </div>
            );
        };

        return (
            <div className='workshop-detail shadow-lg  justify-content-center p-2'>

                <Header 
                    headerImage={ headerImage }
                    title={ title }
                    subtitle={ subtitle }
                    startingDate={ startingDate }
                />

                <Description 
                    description={ description }
                    descriptionImage={ descriptionImage }
                />

                <Lessons lessons={ lessons } />

                <Location 
                    location={ location }
                    locationImage={ locationImage }
                />

                <Options options={ options } />

                <Register options={ options } workshopId={ id } />
            </div>
        );
    };
};

export default WorkshopDetail;
