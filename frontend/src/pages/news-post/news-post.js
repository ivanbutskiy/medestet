import React, { Component } from 'react';
import NewsPostHeader from './news-post-header';
import MedestetService from '../../service/medestet-service';
import NewsContent from './news-content';
import { Link } from 'react-router-dom';
import ErrorBanner from '../../components/error-banner';
import Spinner from '../../components/spinner';

import './news-post.css';

class NewsPost extends Component {

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

    getNewsPost() {
        const { slug } = this.state;
        this.service.getNewsPost(slug)
            .then(post => {
                this.setState({
                    title: post.data.title,
                    image: post.data.image,
                    subtitle: post.data.subtitle,
                    addingDate: post.data.adding_date,
                    text: post.data.text,

                    loading: false
                })
            }).catch(error => {
                this.setState({ error: true, loading: false })
            })
    };

    componentDidMount() {
        this.getNewsPost();
        window.scrollTo(0, 0);
    };

    render() {

        const { title, image, subtitle, addingDate, text, error, loading } = this.state;

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
                <NewsPostHeader 
                    title={ title } 
                    image={ image }
                    subtitle={ subtitle }
                    addingDate={ addingDate }
                />
                <div className='alert alert-primary return-account-page' role='alert'>
                    <Link to='/news/'>
                        <i className='fal fa-arrow-circle-left mr-2'></i>
                        Вернуться ко всем новостям
                    </Link>
                </div>
                <NewsContent text={ text } />
            </div>
        );
    };
};

export default NewsPost;