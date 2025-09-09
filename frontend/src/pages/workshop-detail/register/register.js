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
                    this.setState({ amount: selectedOptionPrice });
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
                        <h4 className='mt-3'>Ви успішно подали заявку на участь у семінарі!</h4>
                        <p>Він був доданий до вашого облікового запису, а на вашу пошту { email } було надіслано лист.</p>
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
                <h2 className='register-workshop-header text-center'>Запис на участь</h2>
                <div className='register-content text-center container'>
                    <p className='mt-5'>Запис на участь у семінарі доступний тільки зареєстрованим користувачам. Для початку <Link to='/register/'>пройдіть реєстрацію</Link> і записуйтеся.</p>
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
                        <h4>Промокод успішно активовано!</h4>
                        <p className='mt-3'>За ним доступна знижка { `${promoCodePercent}%` }. Підсумкова сума перерахована</p>
                    </div>
                )
            } else if (successPromocodeVerify === true && promoCodeActive === true && !forThisWorkshop) {
                return (
                    <div className='promocode col-md-6 card text-center mt-4'>
                        <h4>Промокод успішно перевірено</h4>
                        <p className='mt-3'>Але для цього семінару він недоступний</p>
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
                                className='btn btn-block btn-primary mt-3'>Активувати</button>
                        </form>
                    </div>
                );
            };
        };
        
        return (
            <div className='register-workshop shadow-lg rounded container mt-5'>
                <h2 className='register-workshop-header text-center'>Запис на семінар</h2>
                <div className='row align-items-center mt-3'>
                    <div className='col-md-6 mt-2'>
                        <p><strong>Виберіть варіант участі:</strong></p>
                        { getOptions() }
                        <br></br>
                        <p><strong>Вартість обраного варіанту: </strong>{ selectedOptionPrice } грн.</p>
                        <p><strong>Підсумкова сума: </strong>{ amount } грн.</p>
                    </div>

                    { promoCodeBlock() }

                </div>
                <form 
                    className='form-group form-shop-order' 
                    acceptCharset='utf-8'
                    onSubmit={ (e) => this.checkWorkshopOrder(e) }
                    >

                    <button type='submit' className='btn btn-block btn-primary mt-5 mb-3 submit-shop-order' >
                        Надіслати заявку
                    </button>
                </form>
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
