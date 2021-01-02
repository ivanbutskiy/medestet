import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import HeaderBasket from './header-basket';
import BasketList from './basket-list';

import './basket.css';

class Basket extends Component {

    render() {

        if(this.props.count === 0) {
            return (
                <div className='basket-page shadow-lg'>
                    <HeaderBasket />
                    <div className=''>
                        <div className='container favorites'>
                            <div className='row text-center'>
                                <div className='empty-basket col-lg-12 p-5 mb-5'>
                                    <i className='far fa-shopping-basket'></i>
                                    <h3>Ваша корзина пока что пуста</h3>
                                    <p>Но вы ее можете пополнить, {<Link to='/shop/'>начав покупки</Link>} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <div className='basket-page shadow-lg'>
                <HeaderBasket />
                <BasketList />
            </div>
        );
    };
};

const mapStateToProps = store => ({
    count: store.basketReducer.count
})

export default connect(mapStateToProps, null)(Basket);
