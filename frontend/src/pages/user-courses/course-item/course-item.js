import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import MedestetService from '../../../service/medestet-service';
import ErrorBanner from '../../../components/error-banner';

import './course-item.css';

export default class CourseItem extends Component {

    state = {
        slug: this.props.slug,
        title: this.props.title,
        shortDescription: this.props.shortDescription,
        previewImage: this.props.previewImage,

        endingDate: '',
        daysLeft: '',

        error: false
    };

    service = new MedestetService();

    componentDidMount() {
        this.service.getCourseOrder(this.props.slug)
            .then(result => {
                this.setState({
                    endingDate: result.data.ending_date,
                    daysLeft: result.data.days_left
                });
            }).catch(error => {
                this.setState({error: true});
            });
    };


    render() {

        const {
            slug, 
            title,
            shortDescription,  
            previewImage,
            endingDate,
            daysLeft,
            error
        } = this.state;

        if (error) {
            return (
                <div className='card course-item shadow-sm'>
                    <div className='no-gutters'>
                        <ErrorBanner />
                    </div>
                </div>
            );
        };

        return (
            <div className='card course-item shadow-sm'>
                <div className='row no-gutters'>
                    <div className='col-md-4'>
                        <img src={ previewImage } className='card-img' alt={ title } />
                    </div>
                    <div className='col-md-8'>
                        <div className='card-body'>
                            { daysLeft > 0 ? <Link to={`/account/courses/watch/${slug}/`}>
                                <h4 className='card-title'>{ title }</h4>
                            </Link> : <h4 className='card-title text-muted'>{ title }</h4> }
                            <div className='card-text'>{ ReactHtmlParser(shortDescription) }</div>
                            { daysLeft > 0 ? <div className='row card-detail-info mt-4'>
                                <div className='col-md-6'>
                                    <p><i className='fas fa-calendar-week mr-2'></i>Доступ к записям до: { endingDate }</p>
                                </div>
                                <div className='col-md-6'>
                                    <p><i className='fas fa-clock mr-2'></i>Осталось дней: { daysLeft }</p>
                                </div>
                            </div> : 
                            <div className='row card-detail-info mt-4'>
                                <div className='col-md-6'>
                                    <p className='text-muted'><i className='fas fa-clock mr-2'></i>Доступ к записям курса истек</p>
                                </div>
                            </div>
                             }
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};
