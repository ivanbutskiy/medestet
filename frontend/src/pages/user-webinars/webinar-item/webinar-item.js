import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './webinar-item.css';

class WebinarItem extends Component {

    state = {
        title: this.props.title,
        image: this.props.image,
        slug: this.props.slug,
        subtitle: this.props.subtitle
    };

    render() {

        const { title, image, slug, subtitle } = this.state;

        return (
            <div className='workshop-item card mb-3 shadow-sm'>
                <img src={ image } className='card-img-top' alt={ title } />
                <div className='card-body'>
                    <Link to={`/account/webinars/watch/${ slug }/`}>
                        <h4 className='card-title'>{ title }</h4>
                    </Link>
                    <p className='card-text'>{ subtitle }</p>
                </div>
            </div>
        );
    };
};

export default WebinarItem;
