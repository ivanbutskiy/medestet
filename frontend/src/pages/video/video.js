import React, { Component } from 'react';
import MedestetService from '../../service/medestet-service';
import Spinner from '../../components/spinner';
import ErrorBanner from '../../components/error-banner';
import HeaderVideo from './header-video';
import PostItem from './post-item';

import './video.css';

export default class Video extends Component {

    state = {
        postsList: '',

        loading: true,
        error: false, 
        empty: false
    };

    service = new MedestetService();

    getVideoList() {
        this.service.videoList()
            .then(result => {
                if (result.data.count === 0) {
                    this.setState({ empty: true })
                } else {
                    this.setState({
                        postsList: result.data.results.map(video => {
                        return (
                            <PostItem 
                                key={ video.id }
                                title={ video.title }
                                image={ video.image }
                                slug={ video.slug }
                            />
                        );
                    }),
                    loading: false
                })
            }
            }).catch(error => {
                this.setState({ error: true, loading: false });
            });
    };

    componentDidMount() {
        this.getVideoList();
        window.scrollTo(0, 0);
    };

    render() {

        const { postsList, error, loading, empty } = this.state;

        if (empty) {
            return (
                <div className='blog shadow-lg p-2'>
                    <HeaderVideo />
                    <div className='container blog-spinner blog-list'>
                        <div className='empty-blog text-center'>
                            <i className='fas fa-video text-primary fa-fw'></i>
                            <h4>На данный момент размещенных на сайте видео нет</h4>
                            <p>Но скоро мы приготовим для вас кое-что интересное...</p>
                        </div>
                    </div>
                </div>
            );
        };

        if (error) {
            return (
                <div className='blog shadow-lg p-2'>
                    <HeaderVideo />
                    <div className='container blog-spinner blog-list'>
                        <div>
                            <ErrorBanner />
                        </div>
                    </div>
                </div>
            );
        };

        if (loading) {
            return (
                <div className='blog shadow-lg p-2'>
                    <HeaderVideo />
                    <div className='container blog-spinner blog-list'>
                        <div>
                            <Spinner />
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <div className='blog shadow-lg p-2'>
                <HeaderVideo />
                <div className='container content blog-list'>
                    <div className='row'>
                        { postsList }
                    </div>
                </div>
            </div>
        );
    };
};
