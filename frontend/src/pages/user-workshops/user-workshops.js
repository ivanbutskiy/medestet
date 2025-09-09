import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderAccountPages from '../../components/header-account-pages';
import ReturnAccountPage from '../../components/return-account-page';
import MedestetService from '../../service/medestet-service';
import NonAuth from '../non-auth';
import Spinner from '../../components/spinner';
import ErrorBanner from '../../components/error-banner';
import WorkshopItem from './workshop-item';

import './user-workshops.css';

class UserWorkshops extends Component {

    state = {
        empty: false,
        loading: true,
        error: false,
        workshopsList: '',
    };

    service = new MedestetService();

    componentDidMount() {
        this.service.getUserWorkshops()
            .then(result => {
                if (result.data.count === 0) {
                    this.setState({ empty: true })
                } else {
                    this.setState({
                        workshopsList: result.data.results.map(order => {
                            return (
                                <WorkshopItem 
                                    key={ order.id }
                                    slug={ order.workshop.slug }
                                    date={ order.workshop.starting_date }
                                    workshopTitle={ order.workshop.title }
                                    status={ order.status }
                                    orderDate={ order.payment_date }
                                />
                            )
                        }),
                        loading: false
                    });
                };
            }).catch(error => {
                this.setState({ error: true, loading: false })
            });
        window.scrollTo(0, 0);
    };

    render() {

        const { empty, loading, error, workshopsList } = this.state;

        if (!this.props.isAuthenticated) {
            return <NonAuth />
        };

        if (error) {
            return (
                <div className='user-courses-list shadow-lg p-2'>
                    <HeaderAccountPages title={ 'Мої семінари' } />
                    <ReturnAccountPage />
                    <div className='user-courses-list-error'>
                        <ErrorBanner />
                    </div>
                </div>    
            );
        };

        if (empty) {
            return (
                <div className='user-courses-list shadow-lg p-2'>
                    <HeaderAccountPages title={ 'Мої семінари' } />
                    <ReturnAccountPage />
                    <div className='container mt-4'>
                        <div className='empty-courses-list text-center'>
                            <i className='fas fa-chalkboard-teacher text-primary fa-fw'></i>
                            <h4>Поки що ви не записалися на жоден семінар</h4>
                            <p>Але ви можете це швидко виправити і <Link to='/workshops/'>вибрати для себе семінар</Link></p>
                        </div>
                    </div>
                </div>    
            );
        };

        if (loading) {
            return (
                <div className='user-courses-list shadow-lg p-2'>
                    <HeaderAccountPages title={ 'Мої семінари' } />
                    <ReturnAccountPage />
                    <div className='user-courses-list-error'>
                        <Spinner />
                    </div>
                </div>  
            );
        };

        return (
            <div className='user-courses-list shadow-lg p-2'>
                <HeaderAccountPages title={ 'Мої семінари' } />
                <ReturnAccountPage />
                <div className='container mt-4'>
                    { workshopsList }
                </div>
            </div>
        );
    };
};

const mapStateToProps = store => ({
    isAuthenticated: store.authReducer.isAuthenticated,
})

export default connect(mapStateToProps, null)(UserWorkshops);