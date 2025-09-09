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

        courseId: this.props.courseId,

        promocode: '',
        successPromocodeVerify: '',
        promoCodeActive: '',
        promoCodePercent: '',
        forThisCourse: '',

        userId: this.props.id,
        price: this.props.price,
        buySum: this.props.buySum,
        discountPercent: 0,
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
        const { promocode, courseId, price } = this.state;
        
        this.service.checkCoursePromocode(promocode)
            .then(result => {
                if (result.data.is_active) {
                    for (let course of result.data.courses) {
                        if (course === courseId) {
                            this.setState({
                                amount: (parseFloat(price) - (price / 100 * result.data.discount)).toFixed(2),
                                promoCodePercent: result.data.discount,
                                successPromocodeVerify: true,
                                promoCodeActive: true,
                                forThisCourse: true
                            });
                            break;
                        };
                    this.setState({
                        successPromocodeVerify: true,
                        promoCodeActive: true,
                        forThisCourse: false
                    });
                    };
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
            returnURL 
        } = this.state;

        const { 
            successPromocodeVerify, 
            promoCodeActive, 
            promoCodePercent, 
            promocode,
            forThisCourse
        } = this.state;
        
        const { price, buySum, discountPercent } = this.state;

        if (!isAuthenticated) {
            return (
                <div className='register-course shadow-lg rounded container mt-5 p-5'>
                    <h2 className='register-course-header text-center'>Запис на курс</h2>
                    <div className='register-content text-center container'>
                        <p className='mt-5'>Запис на курс доступний лише зареєстрованим користувачам. Для початку <Link to='/register/'>пройдіть реєстрацію</Link> і записуйтеся на курс.</p>
                    </div>
                </div>
            );
        };

        if (error) {
            return (
                <div className='register-course shadow-lg rounded container mt-5 p-5'>
                    <h2 className='register-course-header text-center'>Запис на курс</h2>
                    <div className='register-content text-center container'>
                        <p className='mt-5'>Помилка завантаження даних платіжної системи. Будь ласка, оновіть сторінку, щоб зареєструватися на курс. Якщо форма запису повторно не завантажується, зв'яжіться з нами у розділі «Контакти».</p>
                    </div>
                </div>
            );
        };

        const promoCodeBlock = () => {
            if (successPromocodeVerify === true && promoCodeActive === true && forThisCourse) {
                return (
                    <div className='promocode col-md-6 card text-center mt-4'>
                        <h4>Промокод успішно активовано!</h4>
                        <p className='mt-3'>По ньому дійсна знижка { `${promoCodePercent}%` }. Підсумкова сума перерахована</p>
                    </div>
                )
            } else if (successPromocodeVerify === true && promoCodeActive === true && !forThisCourse) {
                return (
                    <div className='promocode col-md-6 card text-center mt-4'>
                        <h4>Промокод успішно перевірено</h4>
                        <p className='mt-3'>Але для даного курсу він недоступний</p>
                    </div>
                )
            } else if (successPromocodeVerify && !promoCodeActive) {
                return (
                    <div className='promocode col-md-6 card text-center mt-4'>
                        <h4>Промокод успішно перевірено</h4>
                        <p className='mt-3'>Але, на жаль, його термін дії закінчився</p>
                    </div> 
                );
            } else if (successPromocodeVerify === false) {
                return (
                    <div className='promocode col-md-6 card text-center mt-4'>
                        <h4>Помилка перевірки</h4>
                        <p className='mt-3'>На жаль, такого промокоду не існує</p>
                    </div> 
                )
            } else {
                return (
                    <div className='promocode col-md-6 card text-center mt-4'>
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
                <h2 className='register-course-header text-center'>Запис на курс</h2>
                <div className='row align-items-center mt-3'>
                    <div className='col-md-6 mt-2'>
                        <p><strong>Вартість курсу: </strong>{ price } грн.</p>
                        { isAuthenticated && !forThisCourse ? <p><strong>Відсоток вашої знижки: </strong>{ discountPercent }%.</p> : null }
                        <p><strong>Підсумкова сума: </strong>{ amount } грн.</p>
                        { isAuthenticated ? <small>Загальна сума ваших покупок становить {buySum} грн. Зверніть увагу, що при досягненні загальної суми покупок в 5000 грн кожному зареєстрованому користувачеві стає доступною знижка 3%, а при досягненні 18000 грн – 5%.</small> : null }
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
                        Перейти до оплати курсу
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