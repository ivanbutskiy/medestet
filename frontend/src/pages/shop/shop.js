import React, { Component } from 'react';

import HeaderShop from './header-shop';
import CategoriesList from './categories-list';
import ProductsList from './products-list';

import './shop.css';

class Shop extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    };

    render() {

        return (
            <div className='shop-page shadow-lg p-2'>
                <HeaderShop />
                <div className='pl-2 pr-2 row shop-page-content justify-content-center mb-4'>
                    <div className='col-lg-3 mt-3'>
                        <CategoriesList />
                    </div>
                    <div className='col-lg-9 mt-3'>
                        <ProductsList />
                    </div>
                </div>
            </div>
        );
    };
};

export default Shop;
