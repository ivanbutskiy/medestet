import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import MedestetService from '../../../service/medestet-service';
import ErrorBanner from '../../../components/error-banner';

import './register.css';

class Register extends Component {

    service = new MedestetService();

    state = {
        error: '',

        options: this.props.options,
        selectedOption: '',
        discountPercent: 0,
        selectedOptionPrice: 0,
        selectedOptionId: '',
        webinarId: this.props.webinarId,

        merchantLogin: '',
        merchantSecretKey: '',

        promocode: '',
        successPromocodeVerify: '',
        promoCodeActive: '',
        promoCodePercent: '',
        forThisWebinar: '',

        makeDisable: '',

        amount: 0,
        merchantDomainName: this.service.DOMAIN_NAME,
        merchantTransactionSecureType: 'AUTO',
        currency: 'UAH',
        orderDate: '',
        orderReference: '',
        returnURL: `${this.service.API_BASE}/account/webinars/`,
        serviceURL: `${this.service.SERVICE_URL}/api/webinars/order/check-service-url/`,

        successRedirect: ''
    };

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({ options: this.props.options });
        };
    };

    componentDidMount() {
        this.setState({ options: this.props.options });
        this.getDiscountPercent();
        this.getPaymentCore();
        this.getOrderReference();
        this.getOrderDate();
    };

    handleSelectOption(e) {
        this.setState({ selectedOptionId: e.target.value.split(';')[0] })

        const selectedOptionPrice = parseFloat(e.target.value.split(';')[1]);
        if (selectedOptionPrice) {
            this.setState({ selectedOptionPrice: selectedOptionPrice });
        } else {
            this.setState({ selectedOptionPrice: 0 });
        };

        this.getAmountPrice(selectedOptionPrice);
    };

    getDiscountPercent() {
        const { buySum } = this.props;
        if (buySum >= 18000) {
            this.setState({ discountPercent: 5 });
        } else if (buySum >= 5000) {
            this.setState({ discountPercent: 3 });
        } else {
            this.setState({ discountPercent: 0 });
        }
    };

    checkPromoCode(e) {
        e.preventDefault();
        const { promocode, selectedOptionPrice, webinarId } = this.state;
        
        this.service.checkWebinarPromocode(promocode)
            .then(result => {
                if (result.data.is_active) {
                    for (let webinars of result.data.webinars) {
                        if (parseInt(webinars) === parseInt(webinarId)) {
                            this.setState({
                                amount: (selectedOptionPrice - (selectedOptionPrice / 100 * result.data.discount)).toFixed(2),
                                promoCodePercent: result.data.discount,
                                successPromocodeVerify: true,
                                promoCodeActive: true,
                                forThisWebinar: true
                            });
                            break;
                        };
                        this.setState({
                            successPromocodeVerify: true,
                            promoCodeActive: true,
                            forThisWebinar: false,
                            promocode: ''
                        });
                    };
                } else {
                    this.setState({ 
                        promoCodeActive: false,
                        successPromocodeVerify: true,
                        promocode: ''
                    })
                };
            })
            .catch(error => {
                this.setState({ successPromocodeVerify: false, promocode: '' })
            });
    };

    promocodeHandler(e) {
        this.setState({
            promocode: e.target.value,
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

    getOrderDate() {
        const orderDate = new Date();
        this.setState({
            orderDate: orderDate.getTime(),
        });
    };

    getOrderReference() {
        const random = parseInt(Math.random() * 10000)
        const { id, webinarId } = this.props;
        this.setState({
            orderReference: id + 'web' + webinarId + 'web' + random
        });
    };

    orderRegister(e) {
        e.preventDefault();
        this.setState({ makeDisable: true });

        const { selectedOptionPrice, orderReference, 
            selectedOptionId, webinarId, promocode } = this.state;
        const f = document.getElementById('webinar-shop-order');

        this.service.webinarOrderRegister(orderReference, webinarId, selectedOptionId, promocode)
            .then(result => {
                this.setState({ successRedirect: true })
            }).catch(error => {
                this.setState({ error: true })
            });
    };

    getAmountPrice(selectedOptionPrice) {
        const { 
            discountPercent,
            promoCodePercent,
            promoCodeActive 
        } = this.state;

        if (selectedOptionPrice) {
            if (promoCodeActive) {
                this.setState({ 
                    amount: selectedOptionPrice - parseFloat(selectedOptionPrice / 100 * promoCodePercent).toFixed(2)
                });
                return null;
            } else {
                this.setState({ amount: selectedOptionPrice })
            };
        } else {
            this.setState({ amount: 0 })
        }
    };

    render() {

        const { 
            buySum, 
            isAuthenticated, 
            options } = this.props;
        
        const {
            discountPercent,
            selectedOptionPrice,
        } = this.state;

        const {
            promocode,
            successPromocodeVerify,
            promoCodeActive,
            promoCodePercent,
            forThisWebinar 
        } = this.state;

        const {
            amount,
            merchantLogin,
            error,
            merchantDomainName,
            merchantTransactionSecureType,
            orderReference,
            orderDate,
            returnURL,
            serviceURL,
            successRedirect,
            makeDisable
        } = this.state;

        if (!isAuthenticated) {
            return (
                <div className='register-webinar shadow-lg rounded container mt-5 p-5'>
                    <h2 className='register-webinar-header text-center'>Запись на курс</h2>
                    <div className='register-content text-center container'>
                        <p className='mt-5'>Запись на вебинар доступна только зарегистрированным пользователям. Для начала <Link to='/register/'>пройдите регистрацию</Link> и записывайтесь на вебинар.</p>
                    </div>
                </div>
            );
        };

        if (error) {
            return (
                <div className='register-webinar shadow-lg rounded container mt-5'>
                    <ErrorBanner />
                </div>
            );
        };

        if (successRedirect) {
            return <Redirect to={ '/account/webinars/' } />
        };

        const getOptions = () => {
            return options.map(option => {
                return (
                    <div className='form-check' key={ option.id }>
                        <input 
                            className='form-check-input' 
                            type='radio' 
                            name='exampleRadios' 
                            id={ option.title } 
                            value={ `${option.id};${option.price}` }
                            onChange={ (e) => this.handleSelectOption(e) }
                            required />
                        <label 
                            className='form-check-label' 
                            htmlFor={ option.title } />
                            { option.title }
                    </div>
                )
            });
        };

        const promoCodeBlock = () => {
            if (successPromocodeVerify === true && promoCodeActive === true && forThisWebinar) {
                return (
                    <div className='promocode col-md-6 card text-center mt-4'>
                        <h4>Промокод успешно активирован!</h4>
                        <p className='mt-3'>По нему доступна скидка { `${promoCodePercent}%` }. Итоговая сумма пересчитана</p>
                    </div>
                )
            } else if (successPromocodeVerify === true && promoCodeActive === true && !forThisWebinar) {
                return (
                    <div className='promocode col-md-6 card text-center mt-4'>
                        <h4>Промокод успешно проверен</h4>
                        <p className='mt-3'>Но для этого вебинара он не доступен</p>
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
                        { isAuthenticated && discountPercent ? <small className='promocode-small-text mt-2'>Обратите внимание, что при активации промокода будет учтена только скидка, которую предоставляет промокод. А ваша клиентская скидка {discountPercent}% учтена не будет.</small> : null }
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
                                disabled={ selectedOptionPrice > 0 ? false : true } 
                                className='btn btn-block btn-primary mt-3'>Активировать</button>
                        </form>
                    </div>
                );
            };
        };

        const getMerchantSignature = () => {
            const { 
                amount,
                merchantLogin,
                merchantDomainName,
                orderReference,
                orderDate,
                merchantSecretKey } = this.state;
            const hashString = [
                merchantLogin,
                merchantDomainName,
                orderReference,
                orderDate,
                amount,
                'UAH',
                this.props.webinarTitle,
                '1',
                amount
            ].join(';');
            const crypto = require('crypto');
            const merchantSignature = crypto.createHmac('md5', merchantSecretKey)
                .update(hashString).digest('hex');
            
            return merchantSignature;
        };

        return (
            <div className='register-webinar shadow-lg rounded container mt-5'>
                <h2 className='register-webinar-header text-center'>Запись на участие</h2>
                <div className='row align-items-center mt-3'>
                    <div className='col-md-6 mt-2'>
                        <form 
                            id='webinar-shop-order' 
                            className='form-group form-shop-order' 
                            method='post' 
                            action='https://secure.wayforpay.com/pay' 
                            acceptCharset='utf-8'
                            onSubmit={ (e) => this.orderRegister(e) }
                            >

                            <p><strong>Выберите вариант участия:</strong></p>
                                { getOptions() }

                            <input readOnly className='form-control' hidden name='merchantAccount' value={ merchantLogin } />
                            <input readOnly className='form-control' hidden name='merchantDomainName' value={ merchantDomainName } />
                            <input readOnly className='form-control' hidden name='merchantTransactionSecureType' value={ merchantTransactionSecureType } />
                            <input readOnly className='form-control' hidden name='orderReference' value={ orderReference } />
                            <input readOnly className='form-control' hidden name='orderDate' value={ orderDate } />
                            <input readOnly className='form-control' hidden name='amount' value={ amount.toString() } />
                            <input readOnly className='form-control' hidden name='currency' value='UAH' />
                            <input readOnly className='form-control' hidden name='productName[]' value={ this.props.webinarTitle } />
                            <input readOnly className='form-control' hidden name='productPrice[]' value={ amount.toString() } />
                            <input readOnly className='form-control' hidden name='productCount[]' value='1' />

                            <input readOnly className='form-control' hidden name='returnUrl' value={ returnURL } />
                            <input readOnly className='form-control' hidden name='serviceUrl' value={ serviceURL } />
                            <input readOnly className='form-control' hidden name='merchantSignature' value={ getMerchantSignature() } />

                            <br></br>
                            <p><strong>Стоимость выбранного варианта: </strong>{ selectedOptionPrice } грн.</p>
                            <p><strong>Итоговая сумма: </strong>{ amount } грн.</p>
                        </form>
                    </div>

                    { promoCodeBlock() }

                    <button 
                        type='submit'
                        form='webinar-shop-order'
                        className='btn btn-block btn-primary mt-5 mb-3 submit-shop-order'
                        disabled={ makeDisable ? true : false } >
                        Записаться
                    </button>

                </div>
                
                <small>Общая сумма ваших покупок составляет { buySum } грн. Обратите внимание, что при достижении общей суммы покупок в 5000 грн каждому зарегистрированному пользователю становится доступной скидка 3%, а при достижении 18000 грн – 5%.</small>
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