import React, { Component } from 'react';

import MedestetService from '../../service/medestet-service';
import Spinner from '../../components/spinner';

import Header from './header';
import Description from './description';
import Themes from './themes';
import Options from './options';

import './webinar-detail.css';

class WebinarDetail extends Component {

    service = new MedestetService();

    state = {
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
        this.getWebinars();
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

                <Themes themes={ this.state.themes } />

                <Options options={ this.state.options } />

            </div>
        );
    };
};

export default WebinarDetail;

// TODO обработать ошибки: создать компонент ошибки и выдать его, а в CourseDetail изменить поведение промиса
// TODO добавить форму оплаты и записи