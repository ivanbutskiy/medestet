import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './workshop-item.css';

class WorkshopItem extends Component {

    state = {
        slug: this.props.slug,
        image: this.props.image,
        title: this.props.title,
        subtitle: this.props.subtitle,
        startingDate: this.props.startingDate
    };

    render() {

        const { slug, image, title, subtitle, startingDate } = this.state;

        return (
            <div className='workshop-item card mb-3 shadow-sm'>
                <img src={ image } className='card-img-top' alt={ title } />
                <div className='card-body'>
                    <Link to={`/workshops/${ slug }/`}>
                        <h4 className='card-title'>{ title }</h4>
                    </Link>
                    <p className='card-text mb-5'>{ subtitle }</p>
                    <p className='workshop-date'><i className='fas fa-calendar-week mr-2'></i> Дата начала: { startingDate }</p>
                </div>
            </div>
        );
    };
};

export default WorkshopItem;
