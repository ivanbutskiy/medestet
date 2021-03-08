import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ProductItem extends Component {

    state = {
        slug: '',
        image: '',
        title: ''
    };

    componentDidMount() {
        this.setState({
            slug: this.props.slug,
            image: this.props.image,
            title: this.props.title
        });
    };

    render() {

        const { slug, title, image } = this.state;

        return (
            <div className='card-wrapper'>
                <div className='card-product'>
                    <div className='card-image'>
                        <img src={ image } alt={ title } />
                    </div>
                    <div className='details'>
                        <Link to={`/products/detail/${slug}`}><p>{ title }</p></Link>
                    </div>
                </div>
            </div>
        );
    };
};