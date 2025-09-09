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
        promocode: '',
        promocodeProductsId: '',

        basketList: this.props.basketList
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
                promoCodeActive: this.props.promoCodeActive,
                promocodeProductsId: this.props.promocodeProductsId,

                basketList: this.props.basketList
            });
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
                promocode,
                promocodeProductsId,
                basketList } = this.state;
        
        const { buySum, isAuthenticated } = this.props;

        if (basketSum <= 250 && onlyHomeProducts) {
            return (
                <div className='container order-sum mt-5 mb-5'>
                    <h5>Загальна сума складає: { basketSum } грн.</h5>
                    <p>Мінімальна сума замовлення складає 250 грн. На даний момент ви не можете оформити замовлення, бо у вашій корзині виключно товари для домашнього догляду, а сума замовлення менше 250 грн включно. Пропонуємо { <Link to='/shop/'>продовжити покупки</Link> }.</p>
                </div>
            );
        };

        const getDiscountProducts = () => {
            const discountProducts = [];
            for (let product of basketList) {
                if (promocodeProductsId.indexOf(product.id) !== -1) {
                    discountProducts.push(product);
                };
            };
            return discountProducts.map(product => {
                return (
                    <p key={ product.id } className='discount-product-item'>• { product.title }</p>
                );
            });
        };

        const promoCodeBlock = () => {
            if (successPromocodeVerify === true && promoCodeActive === true) {
                return (
                    <div className='promocode col-md-6 card text-center'>
                        <h4>Промокод успешно активирован!</h4>
                        <p className='mt-3'>По нему доступна скидка { `${promoCodePercent}%` } для товаров:</p>
                        <div className='discount-products card'>
                            { getDiscountProducts() }
                        </div>
                        <p className='mt-3'>Итоговая сумма пересчитана</p>
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
                        { isAuthenticated && (buySum >= 5000) && (buySum < 18000) ? <small className='promocode-small-text mt-2'>Обратите внимание, что при активации промокода будет учтена только скидка, которую предоставляет промокод. А ваша клиентская скидка 3% учтена не будет.</small> : null }
                        { isAuthenticated && buySum >= 18000 ? <small className='promocode-small-text mt-2'>Обратите внимание, что при активации промокода будет учтена только скидка, которую предоставляет промокод. А ваша клиентская скидка 5% учтена не будет.</small> : null }
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
                    { !promoCodeActive && isAuthenticated ? <p><strong>Процент вашей скидки: </strong>{ userDiscountPercent }.</p> : null }
                    <p><strong>Итоговая сумма: </strong>{ totalSum } грн.</p>
                    { isAuthenticated && !promoCodeActive ? <small>Общая сумма ваших покупок составляет {buySum} грн. При достижении общей суммы покупок в 5000 грн каждому зарегистрированному пользователю становится доступной скидка 3%, а при достижении 18000 грн – 5%.</small> : null }
                    { promoCodeActive && isAuthenticated ? <small>Итоговая стоимость пересчитана по скидке, предоставленной промокодом для определенных товаров.</small> : null }
                </div>
                { promoCodeBlock() }
            </div>
        )
    };
};

const mapStateToProps = store => ({
    buySum: store.authReducer.buySum,
    isAuthenticated: store.authReducer.isAuthenticated,
    basketList: store.basketReducer.basketList
});

export default connect(mapStateToProps, null)(OrderSum);