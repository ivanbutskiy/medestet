import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderAccountPages from '../../components/header-account-pages';
import MedestetService from '../../service/medestet-service';
import ReturnAccountPage from '../../components/return-account-page';
import NonAuth from '../non-auth';
import WebinarItem from './webinar-item';
import ErrorBanner from '../../components/error-banner';
import Spinner from '../../components/spinner';

import './user-webinars.css'

class UserWebinars extends Component {
    
    state = {
        webinarsList: '',
        empty: false,
        loading: true,
        error: false
    };

    service = new MedestetService();

    componentDidMount() {
        this.service.getUserWebinars()
            .then(result => {
                this.setState({ loading: false });
                if (result.data.count === 0) {
                    this.setState({ empty: true })
                } else {
                    this.setState({
                        webinarsList: result.data.results.map(result => {
                            return <WebinarItem
                                slug={result.webinar.slug}
                                title={result.webinar.title}
                                subtitle={result.webinar.subtitle}
                                image={result.webinar.description_image}
                                key={ result.webinar.id }
                                endingDate={ result.ending_date }
                                daysLeft={ result.days_left }
                            />
                        })
                    });
                }
            }).catch(error => {
                this.setState({ error: true });
            });
        window.scrollTo(0, 0);
    };

    render() {

        const { webinarsList, loading, empty, error } = this.state;

        if (!this.props.isAuthenticated) {
            return <NonAuth />
        };

        if (error) {
            return (
                <div className='user-courses-list shadow-lg p-2'>
                    <HeaderAccountPages title={ 'Мои вебинары' } />
                    <ReturnAccountPage />
                    <ErrorBanner />
                </div>   
            );
        };

        if (empty) {
            return (
                <div className='user-courses-list shadow-lg p-2'>
                    <HeaderAccountPages title={ 'Мои вебинары' } />
                    <ReturnAccountPage />
                    <div className='container mt-4'>
                        <div className='empty-courses-list text-center'>
                            <i className='fas fa-globe text-primary fa-fw'></i>
                            <h4>Пока что вы не приобрели ни одного вебинара</h4>
                            <p>Но вы можете это быстро исправить и <Link to='/webinars/'>выбрать для себя вебинар</Link>.</p>
                        </div>
                    </div>
                </div>
            );
        };

        if (loading) {
            return (
                <div className='user-courses-list shadow-lg p-2'>
                    <HeaderAccountPages title={ 'Мои вебинары' } />
                    <ReturnAccountPage />
                    <div className='container mt-4 justify-content-center mt-5'>
                        <Spinner />
                    </div>
                </div>
            );
        };

        return (
            <div className='user-courses-list shadow-lg p-2'>
                <HeaderAccountPages title={ 'Мои вебинары' } />
                <ReturnAccountPage />
                <div className='row mt-5 justify-content-center mb-5'>
                    { webinarsList }
                </div>
            </div>
        );
    };
};

const mapStateToProps = store => ({
    isAuthenticated: store.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, null)(UserWebinars);
