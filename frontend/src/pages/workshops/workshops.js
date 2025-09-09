import React, { Component } from 'react';

import WorkshopItem from './workshop-item';
import HeaderWorkshopsList from './header-workshops-list';
import MedestetService from '../../service/medestet-service';
import Spinner from '../../components/spinner';
import ErrorBanner from '../../components/error-banner';

import './workshops.css';

class Workshops extends Component {

    service = new MedestetService();

    state = {
        workshops: [],
        loaded: false,
        error: false,
        count: ''
    };

    getWorkshopsList() {
        this.service.getWorkshopsList()
        .then(workshops => {
            if (workshops.status === 200) {
                if (workshops.data.count === 0) {
                    this.setState({ count: 0 });
                } else {
                    this.setState({
                        workshops: workshops.data.results.map(workshop => {
                            return <WorkshopItem 
                                key={ workshop.id }
                                slug={ workshop.slug }
                                image={ workshop.description_image }
                                title={ workshop.title }
                                subtitle={ workshop.subtitle }
                                startingDate={ workshop.starting_date }
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
        this.getWorkshopsList();
        window.scrollTo(0, 0);
    };

    render() {

        const { workshops, loaded, error, count } = this.state;

        if (count === 0) {
            return (
                <div className='workshops-list shadow-lg p-2'>
                    <HeaderWorkshopsList />
                    <div className='empty-workshops-list text-center'>
                        <i className='fas fa-user-friends text-primary fa-fw'></i>
                        <h4>На даний момент семінарів немає</h4>
                        <p>Але скоро ми підготуємо для вас дещо цікаве...</p>
                    </div>
                </div>
            );
        };

        if (error === true) {
            return (
                <div className='workshops-list shadow-lg p-2'>
                    <HeaderWorkshopsList />
                    <div className='container p-5 text-center error-message'>
                        <ErrorBanner />
                    </div>
                </div>
            );
        };

        if (!loaded) {
            return (
                <div className='workshops-list workshops-list-spinner shadow-lg p-2'>
                    <HeaderWorkshopsList />
                    <div className='spinner-content'>
                        <Spinner />
                    </div>
                </div>
            );
        };

        return (

            <div className='workshops-list shadow-lg p-2'>
                <HeaderWorkshopsList />
                <div className='container workshops-list-items p-2'>
                    <div className='row justify-content-center mb-2'>
                        { workshops }
                    </div>
                </div>
            </div>

        );
    };
};

export default Workshops;