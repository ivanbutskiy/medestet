import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './order-sum.css';

class OrderSum extends Component {

    state = {
        basketSum: this.props.basketSum,
        onlyHomeProducts: this.props.onlyHomeProducts,
        userDiscountUAH: this.props.userDiscountUAH,
        userDiscountPercent: this.props.userDiscountPercent,
        totalSum: this.props.totalSum,

        promoCodePercent: this.props,
        successPromocodeVerify: this.props,
        promoCodeActive: this.props,
        promocode: ''
    };

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({ 
                basketSum: this.props.basketSum,
                onlyHomeProducts: this.props.onlyHomeProducts,
                userDiscountUAH: this.props.userDiscountUAH,
                userDiscountPercent: this.props.userDiscountPercent,
                totalSum: this.props.totalSum,
            
                promoCodePercent: this.props.promoCodePercent,
                successPromocodeVerify: this.props.successPromocodeVerify,
                promoCodeActive: this.props.promoCodeActive
            })
        };
    };

    promocodeHandler(e) {
        this.setState({
            promocode: e.target.value,
        });
    };

    checkPromoCode(e) {
        const { promocode } = this.state;
        e.preventDefault();
        this.props.checkPromoCode(promocode);
    };

    render() {

        const { basketSum, 
                onlyHomeProducts, 
                userDiscountPercent, 
                totalSum,
                promoCodePercent,
                successPromocodeVerify,
                promoCodeActive,
                promocode } = this.state;
        
        const { buySum } = this.props;

        if (basketSum <= 250 && onlyHomeProducts) {
            return (
                <div className='container order-sum mt-5 mb-5'>
                    <h5>Общая сумма составляет: { basketSum } грн.</h5>
                    <p>Минимальная сумма заказа составляет 250 грн. На данный момент вы не можете оформить заказ, потому что в вашей корзине исключительно товары для домашнего ухода, а сумма заказа меньше 250 грн. включительно. Предлагаем { <Link to='/shop/'>продолжить покупки</Link> }.</p>
                </div>
            );
        };

        const promoCodeBlock = () => {
            if (successPromocodeVerify === true && promoCodeActive === true) {
                return (
                    <div className='promocode col-md-6 card text-center'>
                        <h4>Промокод успешно активирован!</h4>
                        <p className='mt-3'>По нему доступна скидка { `${promoCodePercent}%` }. Итоговая сумма пересчитана</p>
                    </div>
                )
            } else if (successPromocodeVerify && !promoCodeActive) {
                return (
                    <div className='promocode col-md-6 card text-center'>
                        <h4>Промокод успешно проверен</h4>
                        <p className='mt-3'>Но, к сожалению, его срок активности истек</p>
                    </div> 
                );
            } else if (successPromocodeVerify === false) {
                return (
                    <div className='promocode col-md-6 card text-center'>
                        <h4>Ошибка проверки</h4>
                        <p className='mt-3'>К сожалению, такого промокода не существует</p>
                    </div> 
                )
            } else {
                return (
                    <div className='promocode col-md-6 card text-center'>
                        <h4>У вас есть промокод?</h4>
                        <h4>Вы можете его активировать!</h4>
                        <form className='form-group mt-3' onSubmit={ (e) => this.checkPromoCode(e) }>
                            <input 
                                type='text'
                                className='form-control'
                                value={ promocode }
                                required
                                onChange={ (e) => this.promocodeHandler(e) }>
                            </input>
                            <button 
                                type='submit' 
                                className='btn btn-block btn-primary mt-3'>Активировать</button>
                        </form>
                    </div>
                );
            };
        };
        
        return (
            <div className='container order-sum row align-items-center justify-content-center'>
                <div className='col-md-6'>
                    <p><strong>Сумма товаров в корзине составляет: </strong>{ basketSum } грн.</p>
                    <p><strong>Процент вашей скидки: </strong>{ userDiscountPercent }.</p>
                    {/* <p><strong>Сумма вашей скидки: </strong>{ userDiscountUAH } грн.</p> */}
                    <p><strong>Итоговая сумма: </strong>{ totalSum } грн.</p>
                    <small>Общая сумма ваших покупок составляет {buySum} грн. Обратите внимание, что при достижении общей суммы покупок в 5000 грн каждому зарегистрированному пользователю становится доступной скидка 3%, а при достижении 18000 грн – 5%.</small>
                </div>
                { promoCodeBlock() }
            </div>
        )
    };
};

const mapStateToProps = store => ({
    buySum: store.authReducer.buySum
});

export default connect(mapStateToProps, null)(OrderSum);