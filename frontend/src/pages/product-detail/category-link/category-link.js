import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './category-link.css';

class CategoryLink extends Component {

    state = {
        title: this.props.title,
        slug: this.props.slug
    };

    render() {

        const { title, slug } = this.state;

        return (
            <div className='alert alert-primary mt-5 category-link' role='alert'>
                <Link to={`/shop/category/${ slug }/`}><i className='fal fa-arrow-circle-left mr-2'></i>{`Повернутися в категорію «${ title }»`}</Link>
            </div>
        );
    };
};

export default CategoryLink;