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

            <li className='list-group-item d-flex align-items-center category-item'>
                    <img src={ image } className='mr-2' alt={ title } />
                    <Link to={`/shop/category/${ slug }/`}>{ title }</Link>
            </li>

        );
    };
};

export default CategoryItem;