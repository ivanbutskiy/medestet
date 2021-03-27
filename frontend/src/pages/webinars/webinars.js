import React, { Component } from 'react';

import MedestetService from '../../service/medestet-service';
import Spinner from '../../components/spinner';
import WebinarItem from './webinar-item';
import HeaderWebinarsList from './header-webinars-list';
import ErrorBanner from '../../components/error-banner';

import './webinars.css';

class Webinars extends Component {

    service = new MedestetService();

    state = {
        webinars: [],
        loading: true,
        error: false,
        count: ''
    };

    getWebinarsList() {
        this.service.getWebinarsList()
        .then(webinars => {
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
                }; 
                this.setState({ loading: false });
        }).catch(error => {
            this.setState({ error: true, loading: false });
        })
    };

    componentDidMount() {
        this.getWebinarsList();
        window.scrollTo(0, 0);
    };

    render() {

        const { webinars, loading, error, count } = this.state;

        if (count === 0) {
            return (
                <div className='workshops-list shadow-lg p-2'>
                    <HeaderWebinarsList />
                    <div className='empty-workshops-list text-center'>
                        <i className='fas fa-globe text-primary fa-fw'></i>
                        <h4>На данный момент вебинаров нет</h4>
                        <p>Но скоро мы приготовим для вас кое-что интересное...</p>
                    </div>
                </div>
            );
        };

        if (error) {
            return (
                <div className='courses-list shadow-lg p-2'>
                    <HeaderWebinarsList />
                    <div className='container p-5 text-center error-message'>
                        <ErrorBanner />
                    </div>
                </div>
            );
        };

        if (loading) {
            return (
                <div className='courses-list shadow-lg p-2'>
                    <HeaderWebinarsList />
                    <div className='container p-2 loading mt-5 text-center'>
                        <Spinner />
                    </div>
                </div>
            );
        };

        return (
            <div className='courses-list shadow-lg p-2'>
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