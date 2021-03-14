import React, { Component } from 'react';
import MedestetService from '../../service/medestet-service';
import Spinner from '../../components/spinner';
import ErrorBanner from '../../components/error-banner';
import HeaderBlog from './header-blog';
import PostItem from './post-item';

import './blog.css';

export default class Blog extends Component {

    state = {
        postsList: '',

        loading: true,
        error: false, 
        empty: false
    };

    service = new MedestetService();

    getPostsList() {
        this.service.blogPostsList()
            .then(result => {
                if (result.data.count === 0) {
                    this.setState({ empty: true })
                } else {
                    this.setState({
                        postsList: result.data.results.map(post => {
                        return (
                            <PostItem 
                                key={ post.id }
                                title={ post.title }
                                image={ post.image }
                                slug={ post.slug }
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
        this.getPostsList();
        window.scrollTo(0, 0);
    };

    render() {

        const { postsList, error, loading, empty } = this.state;

        if (empty) {
            return (
                <div className='blog shadow-lg p-2'>
                    <HeaderBlog />
                    <div className='container blog-spinner blog-list'>
                        <div className='empty-blog text-center'>
                            <i className='fas fa-blog text-primary fa-fw'></i>
                            <h4>На данный момент публикаций в блоге нет</h4>
                            <p>Но скоро мы приготовим для вас кое-что интересное...</p>
                        </div>
                    </div>
                </div>
            );
        };

        if (error) {
            return (
                <div className='blog shadow-lg p-2'>
                    <HeaderBlog />
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
                    <HeaderBlog />
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
                <HeaderBlog />
                <div className='container content blog-list'>
                    <div className='row'>
                        { postsList }
                    </div>
                </div>
            </div>
        );
    };
};
