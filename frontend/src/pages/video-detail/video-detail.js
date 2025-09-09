import React, { Component } from 'react';
import VideoDetailHeader from './video-detail-header';
import MedestetService from '../../service/medestet-service';
import VideoContent from './video-content';
import { Link } from 'react-router-dom';
import ErrorBanner from '../../components/error-banner';
import Spinner from '../../components/spinner';

import './video-detail.css';

class VideoDetail extends Component {

    state = {
        slug: this.props.slug,
        title: '',
        subtitle: '',
        image: '',
        text: '',
        addingDate: '',

        error: false,
        loading: true
    };

    service = new MedestetService();

    getVideo() {
        const { slug } = this.state;
        this.service.getVideoDetail(slug)
            .then(video => {
                this.setState({
                    title: video.data.title,
                    image: video.data.image,
                    subtitle: video.data.subtitle,
                    addingDate: video.data.adding_date,
                    text: video.data.text,
                    video: video.data.video,

                    loading: false
                })
            }).catch(error => {
                this.setState({ error: true, loading: false })
            })
    };

    componentDidMount() {
        this.getVideo();
        window.scrollTo(0, 0);
    };

    render() {

        const { title, image, subtitle, addingDate, text, error, loading, video } = this.state;

        if (loading) {
            return (
                <div className='blog-post shadow-lg justify-content-center p-2'>
                    <div className='blog-post-spinner'>
                        <Spinner />
                    </div>
                </div>
            );
        };

        if (error) {
            return (
                <div className='blog-post shadow-lg justify-content-center p-2'>
                    <div className='blog-post-spinner'>
                        <ErrorBanner />
                    </div>
                </div>
            );
        };

        return (
            <div className='blog-post shadow-lg justify-content-center p-2'>
                <VideoDetailHeader 
                    title={ title } 
                    image={ image }
                    subtitle={ subtitle }
                    addingDate={ addingDate }
                />
                <div className='alert alert-primary return-account-page' role='alert'>
                    <Link to='/video/'>
                        <i className='fal fa-arrow-circle-left mr-2'></i>
                        Повернутися до всіх відео
                    </Link>
                </div>
                <VideoContent text={ text } video={ video } title={ title } />
            </div>
        );
    };
};

export default VideoDetail;