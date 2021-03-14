import React, { Component } from 'react';

import Spinner from '../../components/spinner';
import MedestetService from '../../service/medestet-service';
import ErrorBanner from '../../components/error-banner';

import HeaderWatchWebinar from './header-watch-webinar';
import WebinarContent from './webinar-content';

import './watch-webinar.css';

class WatchWebinar extends Component {

    state = {
        error: false,
        loading: true,

        headerImage: '',
        title: '',

        webinarContent: ''
    };

    service = new MedestetService();

    componentDidMount() {
        this.getUserWatchWebinar();
        window.scrollTo(0, 0);
    };

    getUserWatchWebinar() {
        this.service.getUserWatchWebinar(this.props.match.params.slagWebinar)
            .then(result => {
                this.setState({
                    loading: false,
                    headerImage: result.data.header_image,
                    title: result.data.title,
                    webinarContent: result.data
                });
            }).catch(error => {
                this.setState({ error: true, loading: false });
            });
    };

    render() {

        const { 
            title, 
            headerImage,
            loading,
            error,
            webinarContent } = this.state;

        if (loading) {
            return (
                <div className='course-detail shadow-lg justify-content-center p-2'>
                    <div className='course-detail-spinner'>
                        <Spinner />
                    </div>
                </div>
            );
        };

        if (error || !this.props.match.params.slagWebinar) {
            return (
                <div className='course-detail shadow-lg justify-content-center p-2'>
                    <div className='course-watch-error'>
                        <ErrorBanner />
                    </div>
                </div>
            );
        };

        return (
            <div className='course-detail watch-webinar watch-course shadow-lg justify-content-center p-2'>
                <HeaderWatchWebinar 
                    title={ title }
                    headerImage={ headerImage } />
                <div className='container'>
                    <WebinarContent webinarContent={ webinarContent } />
                </div>
            </div>
        );
    };
};

export default WatchWebinar;
