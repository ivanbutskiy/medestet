import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import './course-item.css';

class CourseItem extends Component {

    state = {
        slug: this.props.slug,
        title: this.props.title,
        shortDescription: this.props.shortDescription,
        startingDate: this.props.startingDate,
        price: this.props.price,
        previewImage: this.props.previewImage
    };

    render() {
            
        const { 
            slug, 
            title,
            shortDescription, 
            startingDate, 
            price, 
            previewImage } = this.state;

        return (

            <div className='card course-item shadow-sm'>
                <div className='row no-gutters'>
                    <div className='col-md-4'>
                        <img src={ previewImage } className='card-img' alt={ title } />
                    </div>
                    <div className='col-md-8'>
                        <div className='card-body'>
                            <Link to={`/courses/${slug}/`}>
                                <h4 className='card-title'>{ title }</h4>
                            </Link>
                            <div className='card-text'>{ ReactHtmlParser(shortDescription) }</div>
                            <div className='row card-detail-info mt-4'>
                                <div className='col-md-6'>
                                    <p><i className='fas fa-calendar-week mr-2'></i> Дата начала: { startingDate }</p>
                                </div>
                                <div className='col-md-6'>
                                    <p><i className='fas fa-tags mr-2'></i> Стоимость: { price } грн.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default CourseItem;