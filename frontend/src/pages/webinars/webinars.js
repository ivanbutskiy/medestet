import React, { Component } from 'react';

import MedestetService from '../../service/medestet-service';
import Spinner from '../../components/spinner';
import WebinarItem from './webinar-item';
import HeaderWebinarsList from './header-webinars-list';

import './webinars.css';

class Webinars extends Component {

    service = new MedestetService();

    state = {
        webinars: [],
        loaded: false,
        error: false,
        count: ''
    };

    getWebinarsList() {
        this.service.getWebinarsList()
        .then(webinars => {
            if (webinars.status === 200) {
                if (webinars.data.count === 0) {
                    this.setState({ count: 0 });
                } else {
                    this.setState({
                        webinars: webinars.data.results.map(webinars => {
                            return <WebinarItem 
                                key={ webinars.id }
                                slug={ webinars.slug }
                                image={ webinars.description_image }
                                title={ webinars.title }
                                subtitle={ webinars.subtitle }
                                startingDate={ webinars.starting_date }
                            />
                        })
                    });
                    this.setState({ loaded: true });
                };
            } else {
                this.setState({ error: true });
            };
        });
    };

    componentDidMount() {
        this.getWebinarsList();
    };

    render() {

        const { webinars, loaded, error, count } = this.state;

        if (count === 0) {
            return (
                <div className='courses-list shadow-lg'>
                    <HeaderWebinarsList />
                    <div className='empty-courses-list'>
                        <i className='fas fa-globe text-primary fa-fw'></i>
                        <h3>На данный момент вебинаров нет</h3>
                        <p>Но скоро мы приготовим для вас кое-что интересное...</p>
                    </div>
                </div>
            );
        };

        if (error === true) {
            return (
                <div className='courses-list shadow-lg'>
                    <HeaderWebinarsList />
                    <div className='container p-5 text-center error-message'>
                        <h2>Ой, что-то пошло не так...</h2>
                    </div>
                </div>
            );
        };

        if (!loaded) {
            return <Spinner />
        };

        return (


            <div className='workshops-list shadow-lg'>
                <HeaderWebinarsList />
                <div className='container workshops-list-items p-2'>
                    <div className='row justify-content-center mb-2'>
                        { webinars }
                    </div>
                </div>
            </div>

        );
    };
};

export default Webinars;