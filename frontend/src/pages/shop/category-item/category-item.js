import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './category-item.css';

class CategoryItem extends Component {

    state = {
        image: this.props.image,
        title: this.props.title,
        slug: this.props.slug
    };

    render() {

        const { image, title, slug } = this.state;

        return (
            <Link className='category-item nav-link px-4 row' to={`/shop/category/${ slug }/`} >
                <img src={ image } className='mr-2' alt={ title } />
                <p className='mt-2'>{ title }</p>
            </Link>
        );
    };
};

export default CategoryItem;