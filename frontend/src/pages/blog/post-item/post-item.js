import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './post-item.css';

class PostItem extends Component {

    state = {
        title: this.props.title,
        image: this.props.image,
        slug: this.props.slug
    };

    render() {

        const { title, image, slug } = this.state;

        return (
            <div className='col-md-4 mb-4'>
                <div className='post-item card mb-3 shadow-sm h-100'>
                    <img src={ image } className='card-img-top' alt={ title } />
                    <div className='card-body'>
                        <Link to={`/blog/${ slug }/`}>
                            <h4 className='card-title'>{ title }</h4>
                        </Link>
                    </div>
                </div>
            </div>
        );
    };
};

export default PostItem;
