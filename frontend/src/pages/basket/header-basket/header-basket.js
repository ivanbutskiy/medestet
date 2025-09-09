import React, { Component } from 'react';

import './header-basket.css';

class HeaderBasket extends Component {

    render() {

        return (
            <div className='jumbotron card shadow-sm header-basket'>
                <div className='container'>
                    <h1><i className='far fa-shopping-basket mr-3 text-primary fa-fw'></i>Кошик</h1>
                </div>
            </div>
        );
    };
};

export default HeaderBasket;
