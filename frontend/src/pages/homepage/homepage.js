import React, { Component } from 'react';

import HeaderSlider from './header-slider';
import Videos from './videos';
import LastNews from './last-news';
import LastProducts from './last-products';

import './homepage.css';

class HomePage extends Component {

    render() {

        return (
            <div className='homepage shadow-lg justify-content-center p-2'>
                <HeaderSlider />
                <Videos />
                <div className='mt-4 mb-4'>
                    <div className='row'>
                        <LastNews />
                        <LastProducts />
                    </div>
                </div>
            </div>
        );
    };
};

export default HomePage;