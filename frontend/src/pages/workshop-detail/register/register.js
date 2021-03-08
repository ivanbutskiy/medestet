import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ErrorBanner from '../../../components/error-banner';
import MedestetService from '../../../service/medestet-service';

import './register.css';

class Register extends Component {

    state = {
        workshopId: this.props.workshopId,
        options: this.props.options,

        discountPercent: '',
        selectedOptionId: '',
        selectedOptionPrice: 0,

        amount: 0,

        successPromocodeVerify: '',
        promoCodeActive: '',
        promoCodePercent: '',
        promocode: '',
        forThisWorkshop: '',

        successRegister: ''
    };

    service = new MedestetService();

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

    handleSelectOption(e) {
        const { discountPercent, promoCodeActive, promoCodePercent } = this.state;

        this.setState({ selectedOptionId: e.target.value.split(';')[0] })
        const selectedOptionPrice = parseFloat(e.target.value.split(';')[1]);
        if (selectedOptionPrice) {
            this.setState({ selectedOptionPrice: selectedOptionPrice });
            if (promoCodeActive) {
                this.setState({ amount: (selectedOptionPrice - (selectedOptionPrice / 100 * promoCodePercent)).toFixed(2) });
            } else {
                if (discountPercent) {
                    this.setState({ amount: (selectedOptionPrice - (selectedOptionPrice / 100 * discountPercent)).toFixed(2) });
                } else {
                    this.setState({ amount: selectedOptionPrice });
                };
            };
        } else {
            this.setState({ selectedOptionPrice: 0 });
        };
    };

    promocodeHandler(e) {
        this.setState({
            promocode: e.target.value,
        });
    };

    checkPromoCode(e) {
        e.preventDefault();
        const { 
            promocode, 
            workshopId, 
            selectedOptionPrice 
        } = this.state;

        this.service.checkWorkshopPromocode(promocode)
            .then(result => {
                if (result.data.is_active) {
                    for (let workshop of result.data.workshops) {
                        if (parseInt(workshop) === parseInt(workshopId)) {
                            this.setState({
                                amount: (selectedOptionPrice - (selectedOptionPrice / 100 * result.data.discount)).toFixed(2),
                                promoCodePercent: result.data.discount,
                                successPromocodeVerify: true,
                                promoCodeActive: true,
                                forThisWorkshop: true
                            });
                            break;
                        };
                        this.setState({
                            successPromocodeVerify: true,
                            promoCodeActive: true,
                            forThisWorkshop: false,
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

    checkWorkshopOrder(e) {
        e.preventDefault();
        const { workshopId, selectedOptionId, promocode } = this.state;
        
        this.service.checkWorkshopOrder(workshopId, selectedOptionId, promocode)
            .then(result => {
                this.setState({ successRegister: true });
            })
            .catch({ error: true });
    };

    componentDidMount() {
        this.getDiscountPercent();
    };

    render() {

        const { isAuthenticated, buySum, email } = this.props;
        const { 
            error, 
            options, 
            discountPercent,
            selectedOptionPrice,
            amount
        } = this.state;

        const {
            successPromocodeVerify,
            promoCodeActive,
            promoCodePercent,
            promocode,
            forThisWorkshop,
            successRegister
        } = this.state;

        if (successRegister) {
            return (
                <div className='register-workshop shadow-lg rounded container mt-5'>
                    <div className='success-register text-center'>
                        <i className='fas fa-user-friends'></i>
                        <h4 className='mt-3'>Вы успешно подали заявку на участие в семинаре!</h4>
                        <p>Он был добавлен в ваш аккаунт, а на вашу почту { email } было отправлено письмо.</p>
                    </div>
                </div>
            );
        };

        if (error) {
            return (
                <div className='register-workshop shadow-lg rounded container mt-5'>
                    <ErrorBanner />
                </div>
            );
        };
        
        if (!isAuthenticated) {
            return (
                <div className='register-workshop shadow-lg rounded container mt-5 p-5'>
                <h2 className='register-workshop-header text-center'>Запись на участие</h2>
                <div className='register-content text-center container'>
                    <p className='mt-5'>Запись на участие в семинаре доступна только зарегистрированным пользователям. Для начала <Link to='/register/'>пройдите регистрацию</Link> и записывайтесь.</p>
                </div>
            </div>
            );
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
            if (successPromocodeVerify === true && promoCodeActive === true && forThisWorkshop) {
                return (
                    <div className='promocode col-md-6 card text-center mt-4'>
                        <h4>Промокод успешно активирован!</h4>
                        <p className='mt-3'>По нему доступна скидка { `${promoCodePercent}%` }. Итоговая сумма пересчитана</p>
                    </div>
                )
            } else if (successPromocodeVerify === true && promoCodeActive === true && !forThisWorkshop) {
                return (
                    <div className='promocode col-md-6 card text-center mt-4'>
                        <h4>Промокод успешно проверен</h4>
                        <p className='mt-3'>Но для этого семинара он не доступен</p>
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
                                disabled={ !selectedOptionPrice ? true : false } 
                                className='btn btn-block btn-primary mt-3'>Активировать</button>
                        </form>
                    </div>
                );
            };
        };
        
        return (
            <div className='register-workshop shadow-lg rounded container mt-5'>
                <h2 className='register-workshop-header text-center'>Запись на семинар</h2>
                <div className='row align-items-center mt-3'>
                    <div className='col-md-6 mt-2'>
                        <p><strong>Выберите вариант участия:</strong></p>
                        { getOptions() }
                        <br></br>
                        <p><strong>Стоимость выбранного варианта: </strong>{ selectedOptionPrice } грн.</p>
                        { !promoCodeActive ? <p><strong>Процент вашей скидки: </strong>{ discountPercent }%.</p> : null }
                        <p><strong>Итоговая сумма: </strong>{ amount } грн.</p>
                    </div>

                    { promoCodeBlock() }

                </div>
                <form 
                    className='form-group form-shop-order' 
                    acceptCharset='utf-8'
                    onSubmit={ (e) => this.checkWorkshopOrder(e) }
                    >

                    <button type='submit' className='btn btn-block btn-primary mt-5 mb-3 submit-shop-order' >
                        Отправить заявку
                    </button>
                </form>
                <small>Общая сумма ваших покупок составляет { buySum } грн. Обратите внимание, что при достижении общей суммы покупок в 5000 грн каждому зарегистрированному пользователю становится доступной скидка 3%, а при достижении 18000 грн – 5%. После отправки заявки на участие мы свяжемся с вами и обсудим дальнейшие условия.</small>
            </div>
        );
    };
};

const mapStateToProps = store => ({
    isAuthenticated: store.authReducer.isAuthenticated,
    buySum: store.authReducer.buySum,
    email: store.authReducer.email
});

export default connect(mapStateToProps, null)(Register);
