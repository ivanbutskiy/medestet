import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MedestetService from '../../service/medestet-service';

import HeaderBasket from './header-basket';
import BasketList from './basket-list';
import OrderSum from './order-sum';
import Order from './order';

import './basket.css';

class Basket extends Component {

    service = new MedestetService();

    state = {
        basketList: this.props.basketList,
        count: this.props.count,
        onlyHomeProducts: true,

        basketSum: 0,
        userDiscountPercent: '0%',
        userDiscountUAH: '',
        totalSum: 0,

        promocode: '',
        promoCodePercent: 0,
        successPromocodeVerify: null,
        promoCodeActive: null
    };

    getSumInfo() {
        const { basketList, buySum } = this.props;
        
        let basketSum = 0;
        if (basketList) {
            for (let sum of basketList) {
                basketSum += sum.summaryPrice;
            };
        };
        this.setState({ basketSum: basketSum.toFixed(2) });

        let userDiscountUAH = 0;
        if (buySum >= 18000) {
            userDiscountUAH = ((basketSum / 100) * 5).toFixed(2);
            this.setState({ 
                userDiscountPercent: '5%',
                userDiscountUAH: userDiscountUAH
            });
        } else if (buySum >= 5000) {
            userDiscountUAH = ((basketSum / 100) * 3).toFixed(2);
            this.setState({
                userDiscountPercent: '3%',
                userDiscountUAH: userDiscountUAH
            });
        } else {
            this.setState({ 
                userDiscountPercent: '0%',
                userDiscountUAH: 0 })
        };
        this.setState({ totalSum: (basketSum - userDiscountUAH).toFixed(2) })
    };

    checkPromoCode = (promoCode) => {

        const totalSum = this.state.totalSum;

        this.service.checkPromoCode(promoCode)
            .then(result => {
                if (result.data.is_active) {
                    this.setState({ 
                        totalSum: (totalSum - ((totalSum / 100) * result.data.discount)).toFixed(2),
                        promoCodePercent: result.data.discount,
                        successPromocodeVerify: true,
                        promocode: result.data.code,
                        promoCodeActive: true
                    })
                } else {
                    this.setState({ 
                        promoCodeActive: false,
                        successPromocodeVerify: true 
                    })
                };
            })
            .catch(err => {
                this.setState({ successPromocodeVerify: false })
            });
    };

    onlyHomeProducts = () => {
        const { basketList } = this.props;
        for (let basketItem of basketList) {
            if (!basketItem.priceGuestUAH) {
                this.setState({ onlyHomeProducts: false })
                break
            };
        };
    };

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                basketList: this.props.basketList,
                count: this.props.count
            });
            this.onlyHomeProducts();
            this.getSumInfo();
        };
    };

    componentDidMount() {
        this.onlyHomeProducts();
        this.getSumInfo();
    };

    render() {

        const { 
            count, 
            basketSum, 
            onlyHomeProducts, 
            promoCodePercent,
            successPromocodeVerify,
            promoCodeActive,
            userDiscountPercent,
            userDiscountUAH,
            totalSum,
            promocode
        } = this.state;
  
        if(count === 0) {
            return (
                <div className='basket-page shadow-lg p-2'>
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
            <div className='basket-page shadow-lg p-2'>
                <HeaderBasket />
                <BasketList />

                <OrderSum 
                    basketSum={ basketSum }
                    onlyHomeProducts={ onlyHomeProducts }
                    userDiscountPercent={ userDiscountPercent }
                    userDiscountUAH={ userDiscountUAH }
                    totalSum={ totalSum }

                    promoCodePercent={ promoCodePercent }
                    successPromocodeVerify={ successPromocodeVerify }
                    promoCodeActive={ promoCodeActive }
                    checkPromoCode={ this.checkPromoCode } 
                />

                { !onlyHomeProducts || basketSum > 250 ? <Order 
                    totalSum={ totalSum }
                    promocode={ promocode } /> : null }
            </div>
        );
    };
};

const mapStateToProps = store => ({
    count: store.basketReducer.count,
    basketList: store.basketReducer.basketList,
    buySum: store.authReducer.buySum,
    isAuthenticated: store.authReducer.isAuthenticated
})

export default connect(mapStateToProps, null)(Basket);
