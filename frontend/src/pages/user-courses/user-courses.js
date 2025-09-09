import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderAccountPages from '../../components/header-account-pages';
import ReturnAccountPage from '../../components/return-account-page';
import MedestetService from '../../service/medestet-service';
import NonAuth from '../non-auth';
import CourseItem from './course-item';
import Spinner from '../../components/spinner';
import ErrorBanner from '../../components/error-banner';

import './user-courses.css';

class UserCourses extends Component {

    state = {
        coursesList: '',
        empty: false,
        loading: true,
        error: false
    };

    service = new MedestetService();

    componentDidMount() {
        this.service.getUserCourses()
            .then(result => {
                this.setState({ loading: false })
                if (result.data.count === 0) {
                    this.setState({ empty: true })
                } else {
                    this.setState({
                        coursesList: result.data.results.map(course => {
                            return <CourseItem
                                slug={course.slug}
                                title={course.title}
                                shortDescription={course.short_description}
                                startingDate={course.starting_date}
                                price={course.price}
                                previewImage={course.preview_image}
                                key={ course.slug }
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

        const { empty, coursesList, loading, error } = this.state;

        if (!this.props.isAuthenticated) {
            return <NonAuth />
        };

        if (error) {
            return (
                <div className='user-courses-list shadow-lg p-2'>
                    <HeaderAccountPages title={ 'Мої курси' } />
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
                    <HeaderAccountPages title={ 'Мої курси' } />
                    <ReturnAccountPage />
                    <div className='container mt-4'>
                        <div className='empty-courses-list text-center'>
                            <i className='fas fa-chalkboard-teacher text-primary fa-fw'></i>
                            <h4>Поки що ви не придбали жодного курсу</h4>
                            <p>Але ви можете це швидко виправити і <Link to='/courses/'>вибрати для себе курс</Link></p>
                        </div>
                    </div>
                </div>    
            );
        };

        if (loading) {
            return (
                <div className='user-courses-list shadow-lg p-2'>
                    <HeaderAccountPages title={ 'Мої курси' } />
                    <ReturnAccountPage />
                    <div className='user-courses-list-error'>
                        <Spinner />
                    </div>
                </div>  
            );
        };

        return (
            <div className='user-courses-list shadow-lg p-2'>
                <HeaderAccountPages title={ 'Мої курси' } />
                <ReturnAccountPage />
                <div className='container mt-4'>
                    { loading ? <Spinner /> : coursesList }
                </div>
            </div>
        );
    };
};

const mapStateToProps = store => ({
    isAuthenticated: store.authReducer.isAuthenticated,
})

export default connect(mapStateToProps, null)(UserCourses);