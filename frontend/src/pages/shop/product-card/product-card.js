import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './product-card.css';

class ProductCard extends Component {

    state = {
        slug: this.props.slug,
        title: this.props.title,
        priceCertifiedUAH: this.props.priceCertifiedUAH,
        priceGuestUAH: this.props.priceGuestUAH,
        headerImage: this.props.headerImage,
        image1: this.props.image1
    }

    render() {

        const { slug, title, priceCertifiedUAH, priceGuestUAH, headerImage, image1 } = this.state;

        return (
            
            <div className='col-md-6 col-sm-6 mb-2 col-lg-4 mt-2'>
                <div className='product-grid3 h-100 shadow-sm'>
                    <div className='product-image3'>
                        <Link to={`/products/detail/${slug}/`}>
                            <img className='pic-1' src={ headerImage } alt={ title } />
                            <img className='pic-2' src={image1 ? image1 : headerImage } alt={ title } />
                        </Link>
                    </div>
                    <div className='product-content'>
                        <p className='title'><a href='/'>{ title }</a></p>
                        <div className='price-list'>
                            <div className='price'><i className='fas fa-user-check mr-2'></i>{ priceCertifiedUAH } грн.</div>
                            <div className='price'><i className='fas fa-tags mr-2'></i>{ priceGuestUAH } грн.</div>
                        </div>
                    </div>
                </div>
            </div>

        );
    };
};

export default ProductCard;