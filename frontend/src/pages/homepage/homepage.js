import React, { Component } from 'react';

import HeaderSlider from './header-slider';
import Videos from './videos';
import LastNews from './last-news';
import LastProducts from './last-products';

import './homepage.css';

class HomePage extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    };

    render() {

        return (
            <div className='homepage shadow-lg justify-content-center p-2'>
                <HeaderSlider />
                <Videos />
                <div className='row mb-4'>
                    <LastNews />
                    <LastProducts />
                </div>
            </div>
        );
    };
};

export default HomePage;