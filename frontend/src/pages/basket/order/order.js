import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import MedestetService from '../../../service/medestet-service';
import PaymentMethods from '../payment-methods';
import DeliveryMethods from '../delivery-methods';
import ErrorBanner from '../../../components/error-banner';
import Spinner from '../../../components/spinner';

import './order.css';

class Order extends Component {

    service = new MedestetService();

    state = {
        amount: this.props.totalSum,
        orderReference: '',
        merchantTransactionSecureType: 'AUTO',
        productNames: '',
        productPrices: '',
        productCounts: '',
        merchantDomainName: this.service.DOMAIN_NAME,
        orderDate: '',
        currency: 'UAH',
        merchantAccount: '',

        serviceUrl: `${this.service.SERVICE_URL}/api/shop/order/check-service-url/`,

        promocode: this.props.promocode,
        
        clientFirstName: this.props.firstName,
        clientLastName: this.props.lastName,
        clientPhone: this.props.phone,
        clientEmail: this.props.email,
        clientRegion: '',
        clientCity: '',
        deliveryAddress: '',
        
        getDeliveryMethodsError: false,
        deliveryMethods: '',
        selectedDeliveryId: '',

        paymentId: '',
        getPaymentMethodsError: false,
        MERCHANT_SECRET_KEY: '',
        paymentType: '',
        paymentMethods: '',

        orderRegisterError: false,
        successfullyRegisterForAnyPayment: '',
        disabledButton: ''
    };

    getOrderDate() {
        const orderDate = new Date();
        this.setState({ 
            orderDate: orderDate.getTime(),
            orderReference: orderDate.getTime() });
    };

    onChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    getMerchantSignature() {
        const { 
            merchantAccount,
            merchantDomainName,
            orderReference,
            orderDate,
            amount,
            currency,
            MERCHANT_SECRET_KEY
        } = this.state;


        const productName = [];
        for (let product of this.props.basketList) {
            productName.push(product.title);
        };
        
        const productCount = [];
        for (let product of this.props.basketList) {
            productCount.push(product.count);
        };

        const productPrice = [];
        for (let product of this.props.basketList) {
            productPrice.push(product.price);
        };

        const hashString = [
            merchantAccount, 
            merchantDomainName, 
            orderReference, 
            orderDate, 
            amount,
            currency,
            ...productName,
            ...productCount,
            ...productPrice
        ].join(';');
        
        const crypto = require('crypto');
        const merchantSignature = crypto.createHmac('md5', MERCHANT_SECRET_KEY).update(hashString).digest('hex');
        return merchantSignature;
    };

    getProductNames() {
        let key = 0;
        this.setState({
            productNames: this.props.basketList.map(product => {
                return (
                    <input 
                        readOnly 
                        className='form-control' 
                        hidden
                        name='productName[]' 
                        value={ product.title }
                        key={ ++key } />
                );
            })
        });
    };

    getProductPrices() {
        let key = 0; 
        this.setState({
            productPrices: this.props.basketList.map(product => {
                return (
                    <input 
                        readOnly
                        hidden
                        className='form-control' 
                        name='productPrice[]' 
                        value={ product.price }
                        key={ ++key } />
                );
            })
        });
    };

    getProductCounts() {
        let key = 0; 
        this.setState({
            productCounts: this.props.basketList.map(product => {
                return (
                    <input 
                        readOnly
                        hidden
                        className='form-control' 
                        name='productCount[]' 
                        value={ product.count }
                        key={ ++key } />
                );
            })
        });
    };

    paymentMethodsHandler = (
        id,
        paymentType,
        MERCHANT_LOGIN,
        MERCHANT_SECRET_KEY) => {
        
        this.setState({
            paymentId: id,
            paymentType: paymentType,
            merchantAccount: MERCHANT_LOGIN,
            MERCHANT_SECRET_KEY: MERCHANT_SECRET_KEY
        });
    };

    getPaymentMethods() {
        this.service.getShopPaymentMethods()
            .then(result => {
                if (result.status === 200) {
                    this.setState({ 
                        paymentMethods: result.data.results.map(payment => {
                            return (
                                <PaymentMethods
                                    key={ payment.id }
                                    id={ payment.id }
                                    title={ payment.title }
                                    paymentType={ payment.payment_type }
                                    MERCHANT_LOGIN={ payment.MERCHANT_LOGIN }
                                    MERCHANT_SECRET_KEY={ payment.MERCHANT_SECRET_KEY }
                                    shortDescription={ payment.short_description }
                                    logo={ payment.logo }
                                    paymentMethodsHandler={ this.paymentMethodsHandler }
                                />
                            );
                        })
                    });
                } else {
                    this.setState({ getPaymentMethodsError: true });
                };
            }).catch(error => {
                this.setState({ getPaymentMethodsError: true });
            });
    };

    deliveryMethodsHandler = (id) => {
        this.setState({
            selectedDeliveryId: id
         });
    };

    getDeliveryMethods() {
        this.service.getShopDeliveryMethods()
            .then(result => {
                if (result.status === 200) {
                    this.setState({
                        deliveryMethods: result.data.results.map(delivery => {
                            return (
                                <DeliveryMethods 
                                    key={ delivery.id }
                                    id = { delivery.id }
                                    title={ delivery.title }
                                    image={ delivery.image }
                                    deliveryMethodsHandler={ this.deliveryMethodsHandler }
                                />
                            )
                        })
                    })
                } else {
                    this.setState({ getDeliveryMethodsError: true });
                };
            }).catch(error => {
                this.setState({ getDeliveryMethodsError: true });
            });
    };

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.getProductNames();
            this.getProductPrices();
            this.getProductCounts();
            this.getOrderDate();
            this.setState({
                amount: this.props.totalSum,
                promocode: this.props.promocode,
                clientFirstName: this.props.firstName,
                clientLastName: this.props.lastName,
                clientPhone: this.props.phone,
                clientEmail: this.props.email,
            });
        };
    };

    componentDidMount() {
        this.getPaymentMethods();
        this.getDeliveryMethods();
        this.getProductNames();
        this.getProductPrices();
        this.getProductCounts();
        this.getOrderDate();
        this.setState({
            promocode: this.props.promocode,
            clientFirstName: this.props.firstName,
            clientLastName: this.props.lastName,
            clientPhone: this.props.phone,
            clientEmail: this.props.email,
            amount: this.props.totalSum
        });
    };

    orderRegister = (e) => {
        e.preventDefault();
        this.setState({ disabledButton: true });
        const { 
            orderReference,
            amount,
            clientLastName,
            clientFirstName,
            clientPhone,
            clientEmail,
            clientRegion,
            clientCity,
            selectedDeliveryId,
            deliveryAddress,
            promocode,
            paymentType,
            orderDate
        } = this.state;

        this.service.orderRegister(
            orderReference,
            amount,
            clientLastName,
            clientFirstName,
            clientPhone,
            clientEmail,
            clientRegion,
            clientCity,
            selectedDeliveryId,
            deliveryAddress,
            promocode,
            orderDate,
            this.props.basketList
            )
            .then(result => {
                if (result.status === 200) {
                    if (paymentType === 'WFP') {
                        const f = document.getElementById('form-shop-order');
                        f.submit();
                    } else {
                        this.setState({ successfullyRegisterForAnyPayment: true })
                    };

                } else {
                    this.setState({ orderRegisterError: true });
                    this.setState({ disabledButton: false });
                }
            }).catch(error => {
                this.setState({ orderRegisterError: true });
                this.setState({ disabledButton: false });
        });
    };

    render() {

        const { getPaymentMethodsError,
                paymentMethods,
                paymentType
        } = this.state;

        const { getDeliveryMethodsError, 
                deliveryMethods,
                orderRegisterError,
                successfullyRegisterForAnyPayment
        } = this.state;

        const {
            merchantAccount,
            amount,
            orderReference,
            productNames,
            productPrices,
            productCounts,
            merchantDomainName,
            orderDate,
            currency,
            merchantTransactionSecureType,
            serviceUrl
        } = this.state;

        const {
            clientFirstName,
            clientLastName,
            clientPhone,
            clientEmail,
            clientRegion,
            clientCity,
            deliveryAddress,
            disabledButton
        } = this.state;
        
        if (getPaymentMethodsError || getDeliveryMethodsError) {
            return (
                <div className='container card mb-4'>
                    <ErrorBanner />
                </div>
            );
        };

        if (!paymentMethods || !deliveryMethods) {
            return (
                <div className='container card mb-4 shop-order-spinner'>
                    <div>
                        <Spinner />
                    </div>
                </div>
            );
        };
        
        if (orderRegisterError) {
            return (
                <div className='container card mb-4'>
                    <div className='order text-center'>
                        <h2>Упс... Не вдалось оформити замовлення</h2>
                        <p>Це помилка серверу. Будь ласка, спробуйте оформити замовлення дещо пізніше або зв'яжіться з нами.</p>
                    </div>    
                </div>
            );
        };

        if (successfullyRegisterForAnyPayment) {
            return (
                <Redirect to='/success-payment/' />
            );
        };

        const merchantSignature = this.getMerchantSignature();

        return (
            <div className='container card mb-4'>
                <div className='order'>
                    <h2>Оформлення замовлення</h2>
                </div>

                <form 
                    id='form-shop-order' 
                    className='form-group form-shop-order' 
                    method='post' 
                    action='https://secure.wayforpay.com/pay' 
                    acceptCharset='utf-8'
                    onSubmit={ (e) => this.orderRegister(e) }>
                    
                    <h4 className='mb-4'>Оберіть спосіб оплати</h4>
                    { paymentMethods }

                    <h4 className='mt-5 mb-4'>Оберіть спосіб доставки</h4>
                    { deliveryMethods }
                    
                    <input readOnly className='form-control' hidden name='merchantAccount' value={ merchantAccount } />
                    <input readOnly className='form-control' hidden name='merchantTransactionSecureType' value={ merchantTransactionSecureType } />
                    <input readOnly className='form-control' hidden name='merchantDomainName' value={ merchantDomainName } />
                    <input readOnly className='form-control' hidden name='orderReference' value={ orderReference } />
                    <input readOnly className='form-control' hidden name='orderDate' value={ orderDate } />
                    <input readOnly className='form-control' hidden name='amount' value={ amount.toString() } />
                    <input readOnly className='form-control' hidden name='currency' value={ currency } />
                    <input readOnly className='form-control' hidden name='merchantSignature' value={ merchantSignature } />
                    { productNames }
                    { productPrices }
                    { productCounts }
                    <input readOnly className='form-control' hidden name='returnUrl' value={ `${this.service.DOMAIN_NAME}/success-payment/` } />
                    <input readOnly className='form-control' hidden name='serviceUrl' value={ serviceUrl } />

                    <h4 className='mt-5 mb-4'>Що і кому будемо відправляти</h4>

                    <div className='row'>

                        <div className='col-md-6'>

                            <label 
                                className='shop-user-label'
                                htmlFor='user-name'>
                                Ваше ім'я:
                            </label>
                            <input 
                                id='user-name'
                                className='form-control' 
                                name='clientFirstName' 
                                type='text'
                                value={ clientFirstName }
                                required
                                onChange={ (e) => this.onChangeHandler(e) } />

                            <label 
                                className='shop-user-label'
                                htmlFor='user-lastname'>
                                Ваше прізвище:
                            </label>
                            <input 
                                id='user-lastname'
                                className='form-control'
                                type='text'
                                name='clientLastName' 
                                value={ clientLastName }
                                required
                                onChange={ (e) => this.onChangeHandler(e) } />

                            <label 
                                className='shop-user-label'
                                htmlFor='user-phone'>
                                Номер телефону:
                            </label>
                            <input 
                                id='user-phone'
                                className='form-control'
                                type='text'
                                name='clientPhone' 
                                value={ clientPhone }
                                required
                                onChange={ (e) => this.onChangeHandler(e) }
                            />
                            <label 
                                className='shop-user-label'
                                htmlFor='user-email'>
                                E-mail:
                            </label>
                            <input 
                                id='user-email'
                                className='form-control'
                                type='email'
                                name='clientEmail' 
                                value={ clientEmail }
                                required
                                onChange={ (e) => this.onChangeHandler(e) }
                            />
                        </div>

                        <div className='col-md-6'>
                            <label 
                                className='shop-user-label'
                                htmlFor='user-region'>
                                Область:
                            </label>
                            <input 
                                id='user-region'
                                className='form-control'
                                type='text'
                                name='clientRegion' 
                                value={ clientRegion }
                                required
                                onChange={ (e) => this.onChangeHandler(e) }
                            />
                            <label 
                                className='shop-user-label'
                                htmlFor='user-city'>
                                Місто:
                            </label>
                            <input 
                                id='user-city'
                                className='form-control'
                                type='text'
                                name='clientCity' 
                                value={ clientCity }
                                required
                                onChange={ (e) => this.onChangeHandler(e) }
                            />
                            <label 
                                className='shop-user-label'
                                htmlFor='delivery-address'>
                                Номер відділення або адреса служби доставки:
                            </label>
                            <input 
                                id='delivery-address'
                                className='form-control'
                                type='text'
                                name='deliveryAddress' 
                                value={ deliveryAddress }
                                required
                                onChange={ (e) => this.onChangeHandler(e) }
                            />
                            <button 
                                type='submit'
                                disabled={ disabledButton ? true : false }
                                className='btn btn-block btn-primary mt-5 mb-3 submit-shop-order' >
                                { paymentType === 'WFP' ? 'Оформити і сплатити замовлення' : 'Оформити замовлення' }
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    };
};

const mapStateToProps = store => ({
    basketList: store.basketReducer.basketList,
    firstName: store.authReducer.firstName,
    lastName: store.authReducer.lastName,
    email: store.authReducer.email,
    phone: store.authReducer.phone,
    isAuthenticated: store.authReducer.isAuthenticated,
})

export default connect(mapStateToProps, null)(Order);