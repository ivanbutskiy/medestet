import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MedestetService from '../../../service/medestet-service';

import './register.css';

class Register extends Component {
    
    service = new MedestetService();

    state = {
        isAuthenticated: this.props.isAuthenticated,
        error: false,

        promocode: '',
        successPromocodeVerify: '',
        promoCodeActive: '',
        promoCodePercent: '',

        userId: this.props.id,
        price: this.props.price,
        buySum: this.props.buySum,
        discountPercent: 0,
        courseId: this.props.courseId,
        courseTitle: this.props.courseTitle,
        
        amount: '',

        merchantLogin: '',
        merchantSecretKey: '',
        merchantDomainName: this.service.DOMAIN_NAME,
        merchantTransactionSecureType: 'AUTO',
        orderReference: '',
        orderDate: '',
        returnURL: `${this.service.API_BASE}/account/courses/`,
        serviceURL: `${this.service.SERVICE_URL}/api/courses/order/check-service-url/`
    };

    getOrderDate() {
        const orderDate = new Date();
        this.setState({
            orderDate: orderDate.getTime(),
        });
    };

    getOrderReference() {
        const random = parseInt(Math.random() * 10000)
        const { userId, courseId } = this.state;
        this.setState({
            orderReference: userId + 'crs' + courseId + 'crs' + random
        });
    };

    getPaymentCore() {
        this.service.getPaymentCore()
            .then(payment => {
                this.setState({
                    merchantLogin: payment.data.merchantLogin,
                    merchantSecretKey: payment.data.merchantSecretKey
                });
            }).catch(error => {
                this.setState({ error: true })
            });
    };

    getTotalSum() {
        const { buySum, price } = this.state;

        if (parseFloat(buySum) >= 18000) {
            this.setState({
                amount: (price - ((price / 100) * 5)).toFixed(2),
                discountPercent: 5
            })
        } else if (parseFloat(buySum) >= 5000) {
            this.setState({
                amount: (buySum - ((buySum / 100) * 3)).toFixed(2),
                discountPercent: 3
            })
        } else {
            this.setState({
                amount: price
            })
        };
    };

    promocodeHandler(e) {
        this.setState({
            promocode: e.target.value,
        });
    };

    checkPromoCode(e) {
        e.preventDefault();
        const { promocode, amount } = this.state;
        
        this.service.checkPromoCode(promocode)
            .then(result => {
                if (result.data.is_active) {
                    this.setState({ 
                        amount: (parseFloat(amount) - ((amount / 100) * result.data.discount)).toFixed(2),
                        promoCodePercent: result.data.discount,
                        successPromocodeVerify: true,
                        promoCodeActive: true
                    })
                } else {
                    this.setState({ 
                        promoCodeActive: false,
                        successPromocodeVerify: true 
                    })
                };
            })
            .catch(error => {
                this.setState({ successPromocodeVerify: false })
            });
    };

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({ isAuthenticated: this.props.isAuthenticated });
            this.getTotalSum();
        };
    };

    componentDidMount() {
        this.getPaymentCore();
        this.getTotalSum();
        this.getOrderReference();
        this.getOrderDate();
    };

    render () {

        const { isAuthenticated, error } = this.state;
        const {
            amount,
            merchantLogin,
            merchantDomainName,
            merchantTransactionSecureType,
            orderReference,
            orderDate,
            courseTitle,
            serviceURL,
            returnURL } = this.state;

        const { successPromocodeVerify, promoCodeActive, promoCodePercent, promocode } = this.state;
        
        const { price, buySum, discountPercent } = this.state;

        if (!isAuthenticated) {
            return (
                <div className='register-course shadow-lg rounded container mt-5 p-5'>
                    <h2 className='register-course-header text-center'>Запись на курс</h2>
                    <div className='register-content text-center container'>
                        <p className='mt-5'>Запись на курс доступна только зарегистрированным пользователям. Для начала <Link to='/register/'>пройдите регистрацию</Link> и записывайтесь на курс.</p>
                    </div>
                </div>
            );
        };

        if (error) {
            return (
                <div className='register-course shadow-lg rounded container mt-5 p-5'>
                    <h2 className='register-course-header text-center'>Запись на курс</h2>
                    <div className='register-content text-center container'>
                        <p className='mt-5'>Ошибка загрузки данных платежной системы. Чтобы зарегистрироваться на курс, пожалуйста, обновите страницу. Если форма записи все равно не загружается, свяжитесь с нами в разделе «Контакты».</p>
                    </div>
                </div>
            );
        };

        const promoCodeBlock = () => {
            if (successPromocodeVerify === true && promoCodeActive === true) {
                return (
                    <div className='promocode col-md-6 card text-center mt-4'>
                        <h4>Промокод успешно активирован!</h4>
                        <p className='mt-3'>По нему доступна скидка { `${promoCodePercent}%` }. Итоговая сумма пересчитана</p>
                    </div>
                )
            } else if (successPromocodeVerify && !promoCodeActive) {
                return (
                    <div className='promocode col-md-6 card text-center mt-4'>
                        <h4>Промокод успешно проверен</h4>
                        <p className='mt-3'>Но, к сожалению, его срок активности истек</p>
                    </div> 
                );
            } else if (successPromocodeVerify === false) {
                return (
                    <div className='promocode col-md-6 card text-center mt-4'>
                        <h4>Ошибка проверки</h4>
                        <p className='mt-3'>К сожалению, такого промокода не существует</p>
                    </div> 
                )
            } else {
                return (
                    <div className='promocode col-md-6 card text-center mt-4'>
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

        const getMerchantSignature = () => {
            const {
                merchantLogin,
                merchantDomainName,
                orderReference,
                orderDate,
                amount,
                merchantSecretKey
            } = this.state;

            const hashString = [
                merchantLogin,
                merchantDomainName,
                orderReference,
                orderDate,
                amount,
                'UAH',
                courseTitle,
                '1',
                amount
            ].join(';');
            const crypto = require('crypto');
            const merchantSignature = crypto.createHmac('md5', merchantSecretKey)
                .update(hashString).digest('hex');
            
            return merchantSignature;
        };

        return (
            <div className='register-course shadow-lg rounded container mt-5'>
                <h2 className='register-course-header text-center'>Запись на курс</h2>
                <div className='row align-items-center mt-3'>
                    <div className='col-md-6 mt-2'>
                        <p><strong>Стоимость курса: </strong>{ price } грн.</p>
                        <p><strong>Процент вашей скидки: </strong>{ discountPercent }%.</p>
                        <p><strong>Итоговая сумма: </strong>{ amount } грн.</p>
                        <small>Общая сумма ваших покупок составляет {buySum} грн. Обратите внимание, что при достижении общей суммы покупок в 5000 грн каждому зарегистрированному пользователю становится доступной скидка 3%, а при достижении 18000 грн – 5%.</small>
                    </div>
                    { promoCodeBlock() }
                </div>
                <form 
                    id='form-shop-order' 
                    className='form-group form-shop-order' 
                    method='post' 
                    action='https://secure.wayforpay.com/pay' 
                    acceptCharset='utf-8'
                    onSubmit={ (e) => this.orderRegister(e) }>

                    <input readOnly className='form-control' hidden name='merchantAccount' value={ merchantLogin } />
                    <input readOnly className='form-control' hidden name='merchantDomainName' value={ merchantDomainName } />
                    <input readOnly className='form-control' hidden name='merchantTransactionSecureType' value={ merchantTransactionSecureType } />
                    <input readOnly className='form-control' hidden name='orderReference' value={ orderReference } />
                    <input readOnly className='form-control' hidden name='orderDate' value={ orderDate } />
                    <input readOnly className='form-control' hidden name='amount' value={ amount.toString() } />
                    <input readOnly className='form-control' hidden name='currency' value='UAH' />
                    <input readOnly className='form-control' hidden name='productName[]' value={ courseTitle } />
                    <input readOnly className='form-control' hidden name='productPrice[]' value={ amount } />
                    <input readOnly className='form-control' hidden name='productCount[]' value='1' />

                    <input readOnly className='form-control' hidden name='returnUrl' value={ returnURL } />
                    <input readOnly className='form-control' hidden name='serviceUrl' value={ serviceURL } />
                    <input readOnly className='form-control' hidden name='merchantSignature' value={ getMerchantSignature() } />

                    <button type='submit' className='btn btn-block btn-primary mt-5 mb-3 submit-shop-order' >
                        Перейти к оплате курса
                    </button>
                </form>
            </div>
        );
    };
};

const mapStateToProps = store => ({
    isAuthenticated: store.authReducer.isAuthenticated,
    buySum: store.authReducer.buySum,
    id: store.authReducer.id
});

export default connect(mapStateToProps, null)(Register);