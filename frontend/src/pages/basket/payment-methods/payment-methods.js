import React, { Component, Fragment } from 'react';
import ReactHtmlParser from 'react-html-parser';

import './payment-methods.css';

class PaymentMethods extends Component {

    state = {
        id: '',
        title: '',
        paymentType: '',
        MERCHANT_LOGIN: '',
        MERCHANT_SECRET_KEY: '',
        shortDescription: '',
        logo: ''
    };

    paymentMethodsHandler() {
        const {
            id,
            paymentType,
            MERCHANT_LOGIN,
            MERCHANT_SECRET_KEY
        } = this.state;
        this.props.paymentMethodsHandler(
            id,
            paymentType,
            MERCHANT_LOGIN,
            MERCHANT_SECRET_KEY
        );
    };

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                id: this.props.id,
                title: this.props.title,
                paymentType: this.props.paymentType,
                MERCHANT_LOGIN: this.props.MERCHANT_LOGIN,
                MERCHANT_SECRET_KEY: this.props.MERCHANT_SECRET_KEY,
                shortDescription: this.props.shortDescription,
                logo: this.props.logo,
                paymentId: this.props.paymentId
            });
        };
    };

    componentDidMount() {
        this.setState({
            id: this.props.id,
            title: this.props.title,
            paymentType: this.props.paymentType,
            MERCHANT_LOGIN: this.props.MERCHANT_LOGIN,
            MERCHANT_SECRET_KEY: this.props.MERCHANT_SECRET_KEY,
            shortDescription: this.props.shortDescription,
            logo: this.props.logo,
            paymentId: this.props.paymentId
        });
    };

    render() {

        const {
            title,
            shortDescription,
            logo } = this.state;

        return (
            <Fragment>
                <div className='row shop-payment-method align-items-center container shadow-sm'>
                    <div className='col-md-6'>
                        <input 
                            className='form-check-input' 
                            type='radio' 
                            name={ 'payment-method' } 
                            id={ title } 
                            value={ title }
                            onChange={ () => this.paymentMethodsHandler() }
                            required 
                            />
                        <label
                            className='form-check-label' 
                            htmlFor={ title }>
                            { title }
                        </label>
                            <hr></hr>
                        <small>{ ReactHtmlParser(shortDescription) }</small>
                    </div>
                    <div className='col-md-6 text-center'>
                        <img className='shop-payment-method-image' src={ logo } alt={ title } />
                    </div>
                </div>
            </Fragment>
        );
    };
};

export default PaymentMethods;
