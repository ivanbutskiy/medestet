import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ProductItem from './product-item';

import MedestetService from '../../../service/medestet-service';

import './last-products.css';

export default class LastProducts extends Component {

    service = new MedestetService();

    state = {
        lastProductsItems: ''
    };

    getLastProducts() {
        this.service.lastProducts()
            .then(result => {
                if (result.data.count > 0) {
                    this.setState({
                        lastProductsItems: result.data.results.map(product => {
                            return (
                                <ProductItem 
                                    key={ product.slug }
                                    slug={ product.slug }
                                    title={ product.title }
                                    image={ product.header_image }
                                />
                            )
                        })
                    })
                }
            })
    };

    componentDidMount() {
        this.getLastProducts();
    };

    render() {

        const { lastProductsItems } = this.state;

        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            swipe: true,
            slidesToScroll: 1,
            cssEase: 'linear'
        };

        return (
            <div className='last-products col-md-6'>
                <div className='card shadow-sm pb-3 h-100'>
                    <h5>Новинки в интернет-магазине</h5>
    
                        <Slider {...settings}>
                            { lastProductsItems }
                        </Slider>
                    <Link to='/shop/'>Перейти в интернет-магазин</Link>
                </div>
            </div>
        );
    };
};
