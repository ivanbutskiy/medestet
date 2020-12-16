import React, { Component } from 'react';

import WorkshopItem from './workshop-item';
import HeaderWorkshopsList from './header-workshops-list';
import MedestetService from '../../service/medestet-service';
import Spinner from '../../components/spinner';

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
    };

    render() {

        const { workshops, loaded, error, count } = this.state;

        if (count === 0) {
            return (
                <div className='courses-list shadow-lg'>
                    <HeaderWorkshopsList />
                    <div className='empty-courses-list'>
                        <i className='fas fa-user-friends text-primary fa-fw'></i>
                        <h3>На данный момент семинаров нет</h3>
                        <p>Но скоро мы приготовим для вас кое-что интересное...</p>
                    </div>
                </div>
            );
        };

        if (error === true) {
            return (
                <div className='courses-list shadow-lg'>
                    <HeaderWorkshopsList />
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