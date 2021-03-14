import React, { Component } from 'react';

import CourseItem from './course-item';
import HeaderCoursesList from './header-courses-list';
import Spinner from '../../components/spinner';
import ErrorBanner from '../../components/error-banner'
import MedestetService from '../../service/medestet-service';

import './courses.css';

class Courses extends Component {

    service = new MedestetService();

    state = {
        courses: [],
        loaded: false,
        error: false,
        count: ''
    };

    getCoursesList() {
        this.service.getCoursesList()
            .then((courses) => {
                if (courses.status === 200) {
                    if (courses.data.count === 0) {
                        this.setState({ count: 0 })
                    } else {
                        this.setState({
                            courses: courses.data.results.map((course) => {
                                return <CourseItem 
                                    key={ course.slug }
                                    slug={ course.slug }
                                    title={ course.title }
                                    subtitle={ course.subtitle } 
                                    shortDescription={ course.short_description } 
                                    startingDate={ course.starting_date }
                                    price={ course.price }
                                    previewImage={ course.preview_image }
                                />
                            })
                        })
                        this.setState({ loaded: true });
                    }
                } else {
                    this.setState({ error: true });
                };
            })
            .catch(error => {
                this.setState({ error: true })
            });
    };

    componentDidMount() {
        this.getCoursesList();
        window.scrollTo(0, 0);
    };

    render() {

        const { courses, loaded, error, count } = this.state;

        if (count === 0) {
            return (
                <div className='courses-list shadow-lg p-2'>
                    <HeaderCoursesList />
                    <div className='empty-courses-list text-center'>
                        <i className='fas fa-chalkboard-teacher text-primary fa-fw'></i>
                        <h4>На данный момент доступных для прохождения курсов нет</h4>
                        <p>Но скоро мы приготовим для вас кое-что интересное...</p>
                    </div>
                </div>
            );
        };

        if (error) {
            return (
                <div className='courses-list shadow-lg p-2'>
                    <HeaderCoursesList />
                    <div className='container p-5 text-center error-message'>
                        <ErrorBanner />
                    </div>
                </div>
            );
        };

        if (!loaded) {
            return (
                <div className='courses-list shadow-lg p-2'>
                    <HeaderCoursesList />
                    <div className='container p-2 loading mt-5'>
                        <Spinner />
                    </div>
                </div>
            )
        };

        return (
            <div className='courses-list shadow-lg p-2'>
                <HeaderCoursesList />
                <div className='container p-2'>
                    { courses }
                </div>
            </div>
        );
    };
};

export default Courses;