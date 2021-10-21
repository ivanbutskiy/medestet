import React, { Component } from 'react';

import MedestetService from '../../service/medestet-service';
import Spinner from '../../components/spinner';

import Header from './header';
import Description from './description';
import Themes from './themes';
import Options from './options';
import ErrorBanner from '../../components/error-banner';
import Register from './register';

import './webinar-detail.css';

class WebinarDetail extends Component {

    service = new MedestetService();

    state = {
        webinarId: '',
        slug: this.props.slug,
        title: '',
        subtitle: '',
        headerImage: '',
        startingDate: '',

        description: '',
        descriptionImage: '',

        themes: '',

        options: '',

        error: false,
        loaded: false,
    };

    getWebinars() {
        const { slug } = this.state;
        this.service.getWebinarDetail(slug)
            .then((webinar) => {
                    this.setState({
                        webinarId: webinar.data.id,
                        title: webinar.data.title,
                        subtitle: webinar.data.subtitle,
                        headerImage: webinar.data.header_image,
                        startingDate: webinar.data.starting_date,
                        description: webinar.data.description,
                        descriptionImage: webinar.data.description_image,
                        themes: webinar.data.theme,
                        options: webinar.data.option                        

                    });
                    this.setState({ loaded: true })
                })
            .catch (() => {
                this.setState({ loaded: true });
                this.setState({ error: true });
            });
    };

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getWebinars();
    };

    render() {

        if (this.state.loaded === false) {
            return (
                <div className='webinar-detail shadow-lg justify-content-center p-2'>
                    <div className='webinar-detail-spinner text-center'>
                        <Spinner />
                    </div>
                </div>
            );
        };

        if (this.state.error) {
            return (
                <div className='webinar-detail shadow-lg justify-content-center p-2'>
                    <div className='webinar-detail-spinner'>
                        <ErrorBanner />
                    </div>
                </div>
            );
        };

        return (
            <div className='webinar-detail shadow-lg justify-content-center p-2'>

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
                <Options options={ this.state.options } />

                <Register 
                    options={ this.state.options } 
                    webinarId={ this.state.webinarId }
                    webinarTitle={ this.state.title } />

            </div>
        );
    };
};

export default WebinarDetail;
