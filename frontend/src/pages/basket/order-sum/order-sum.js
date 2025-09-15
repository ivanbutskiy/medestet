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
                        <h4>Промокод успішно активовано!</h4>
                        <p className='mt-3'>За ним доступна знижка { `${promoCodePercent}%` } для товарів:</p>
                        <div className='discount-products card'>
                            { getDiscountProducts() }
                        </div>
                        <p className='mt-3'>Підсумкова сума перерахована</p>
                    </div>
                )
            } else if (successPromocodeVerify && !promoCodeActive) {
                return (
                    <div className='promocode col-md-6 card text-center'>
                        <h4>Промокод успішно перевірено</h4>
                        <p className='mt-3'>Але, на жаль, його термін дії закінчився</p>
                    </div> 
                );
            } else if (successPromocodeVerify === false) {
                return (
                    <div className='promocode col-md-6 card text-center'>
                        <h4>Помилка перевірки</h4>
                        <p className='mt-3'>На жаль, такого промокоду не існує</p>
                    </div> 
                )
            } else {
                return (
                    <div className='promocode col-md-6 card text-center'>
                        <h4>У вас є промокод?</h4>
                        <h4>Ви можете його активувати!</h4>
                        { isAuthenticated && (buySum >= 5000) && (buySum < 18000) ? <small className='promocode-small-text mt-2'>Зверніть увагу, що при активації промокоду буде врахована тільки знижка, яку надає промокод. А ваша клієнтська знижка 3% врахована не буде.</small> : null }
                        { isAuthenticated && buySum >= 18000 ? <small className='promocode-small-text mt-2'>Зверніть увагу, що при активації промокоду буде врахована тільки знижка, яку надає промокод. А ваша клієнтська знижка 5% врахована не буде.</small> : null }
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
                                className='btn btn-block btn-primary mt-3'>Активувати</button>
                        </form>
                    </div>
                );
            };
        };
        
        return (
            <div className='container order-sum row align-items-center justify-content-center'>
                <div className='col-md-6'>
                    <p><strong>Сума товарів у кошику становить: </strong>{ basketSum } грн.</p>
                    { !promoCodeActive && isAuthenticated ? <p><strong>Відсоток вашої знижки: </strong>{ userDiscountPercent }.</p> : null }
                    <p><strong>Підсумкова сума: </strong>{ totalSum } грн.</p>
                    { isAuthenticated && !promoCodeActive ? <small>Загальна сума ваших покупок становить {buySum} грн. При досягненні загальної суми покупок в 5000 грн кожному зареєстрованому користувачеві стає доступною знижка 3%, а при досягненні 18000 грн – 5%.</small> : null }
                    { promoCodeActive && isAuthenticated ? <small>Підсумкова вартість перерахована за знижкою, наданою промокодом для певних товарів.</small> : null }
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