import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import './course-item.css';

export default class CourseItem extends Component {

    state = {
        slug: this.props.slug,
        title: this.props.title,
        shortDescription: this.props.shortDescription,
        previewImage: this.props.previewImage
    };

    render() {

        
        const {
            slug, 
            title,
            shortDescription,  
            previewImage } = this.state;

        return (
            <div className='card course-item shadow-sm'>
                <div className='row no-gutters'>
                    <div className='col-md-4'>
                        <img src={ previewImage } className='card-img' alt={ title } />
                    </div>
                    <div className='col-md-8'>
                        <div className='card-body'>
                            <Link to={`/account/courses/watch/${slug}/`}>
                                <h4 className='card-title'>{ title }</h4>
                            </Link>
                            <div className='card-text'>{ ReactHtmlParser(shortDescription) }</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};
