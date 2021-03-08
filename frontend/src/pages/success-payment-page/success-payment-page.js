import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearBasket } from '../../actions/basket';
import './success-payment-page.css';

class SuccessPaymentPage extends Component {

    constructor(props) {
        super(props);
        props.clearBasket();
    };

    render() {

        return (
            <div className='shop-page shadow-lg p-2'>
                <div className='container mb-4 align-items-center text-center success-payment-page'>
                    <div className='content'>
                        <i className='fad fa-clipboard-check'></i>
                        <h2 className='mt-3'>Ваш заказ успешно оформлен!</h2>
                        <p className='mt-2'>В скором времени с вами свяжется наш менеджер</p>
                    </div>
                </div>
            </div>
        );
    };
};

export default connect(null, { clearBasket })(SuccessPaymentPage);