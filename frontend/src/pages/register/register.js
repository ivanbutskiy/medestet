import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signUp, login } from '../../actions/auth';

import './register.css';

class Register extends Component {

    state = {
        email: '', 
        firstName: '', 
        lastName: '', 
        phone: '',
        password: '', 
        rePassword: '',

        passwordNotMatching: null,
        passwordLength: null,
        emailIncorrect: null,
        errorMessages: '',
        success: null,

        fromProduct: false
    };

    onChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value,
            passwordLength: false,
            passwordNotMatching: false,
            errorMessages: ''
        });
    };

    onSubmitHandler(e) {
        e.preventDefault();
        
        const { email, firstName, lastName, phone, password, rePassword } = this.state;

        this.props.signUp(email, firstName, lastName, phone, password, rePassword)
            .then(result => {
                this.props.login(email, password);
                this.setState({ success: true });
            }).catch(error => {
                const message = error.response.data;
                for (let mes in message) {
                    this.setState({ errorMessages: message[mes] });
                };
            }); 
    };

    fromProductHandler() {
        try {
            if (this.props.location.state.fromProduct) {
                this.setState({
                    fromProduct: true
                });
            };
        } catch (error) {
            this.setState({ fromProduct: false })
        };
    };

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.fromProductHandler();
        };
    };

    componentDidMount() {
        this.fromProductHandler();
        window.scrollTo(0, 0);
    };

    render() {

        if (this.props.isAuthenticated) {
            return (
                <Redirect to='/' />
            );
        };

        if (this.state.success) {
            return (
                <Redirect to='/' />
            )
        }

        const { 
                email, 
                firstName, 
                lastName,
                phone,
                password, 
                rePassword,
                errorMessages,
                fromProduct } = this.state;

        const showErrorMessages = () => {
            let keyCounter = 0;
            return (errorMessages.map(message => {
                return (
                    <div 
                        className='alert alert-danger' 
                        key={++keyCounter} 
                        role='alert'>{ message }
                    </div>
                );
            }));
        };

        return (
            <div className='jumbotron shadow-lg register mb-0'>
                <h1>Регистрация</h1>
                { !fromProduct ? <p className='mt-4'>Зарегистрируйтесь на сайте, чтобы иметь возможность проходить курсы, подтвердить статус косметолога сертификатом и покупать товары в нашем интернет-магазине.</p> : null }

                { fromProduct ? <div className='alert alert-danger' role='alert'>
                Чтобы иметь возможность просматривать цены и заказывать товары для косметологов, а также пользоваться всеми возможностями сайта, вам необходимо пройти регистрацию и подтвердить сертификат косметолога.
                </div> : null }

                <hr className='my-4' />

                { errorMessages ? showErrorMessages() : null }

                <form onSubmit={ (e) => this.onSubmitHandler(e) }>
                    <div className='row'>

                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label htmlFor='exampleInputEmail1'>Email</label>
                                <input 
                                    type='email'
                                    name='email'
                                    className='form-control' 
                                    id='exampleInputEmail1' 
                                    aria-describedby='emailHelp'
                                    onChange={ (e) => this.onChangeHandler(e) }
                                    value={ email }
                                    required />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='firstName'>Имя</label>
                                <input 
                                    type='text'
                                    name='firstName'
                                    className='form-control' 
                                    id='firstName'
                                    onChange={ (e) => this.onChangeHandler(e) }
                                    value={ firstName }
                                    required />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='lastName'>Фамилия</label>
                                <input 
                                    type='text'
                                    name='lastName'
                                    className='form-control' 
                                    id='lastName'
                                    onChange={ (e) => this.onChangeHandler(e) }
                                    value={ lastName }
                                    required />
                            </div>
                        </div>

                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label htmlFor='password'>Телефон</label>
                                <input 
                                    type='tel'
                                    name='phone'
                                    className='form-control' 
                                    id='phone'
                                    onChange={ (e) => this.onChangeHandler(e) }
                                    value={ phone }
                                    required />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='password'>Пароль</label>
                                <input 
                                    type='password'
                                    name='password'
                                    className='form-control' 
                                    id='password'
                                    onChange={ (e) => this.onChangeHandler(e) }
                                    value={ password }
                                    required />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='rePassword'>Повторите пароль</label>
                                <input 
                                    type='password'
                                    name='rePassword'
                                    className='form-control' 
                                    id='rePassword'
                                    onChange={ (e) => this.onChangeHandler(e) }
                                    value={ rePassword }
                                    required />
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary ml-3'>Регистрация</button>
                    </div>
                </form>
            </div>
        );
    };
};

const mapStateToProps = (store) => ({
    isAuthenticated: store.authReducer.isAuthenticated
});

export default connect(mapStateToProps, { signUp, login })(Register);