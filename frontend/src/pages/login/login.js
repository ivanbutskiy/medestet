import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from '../../actions/auth';

import './login.css';

class Login extends Component {

    state = {
        email: '',
        password: '',

        error: null
    };

    onChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmitHandler(e) {
        e.preventDefault();
        const { email, password } = this.state;
        this.props.login(email, password)
            .then((result) => {
                if (!result) {
                    this.setState({
                        error: true
                    })
                };
            });
    };

    componentDidMount() {
        window.scrollTo(0, 0);
    };

    render() {

        const { isAuthenticated } = this.props;

        if (isAuthenticated) {
            return (
                <Redirect to='/' />
            );
        };

        const { email, password, error } = this.state;

        if (error) {
            setTimeout(() => {
                this.setState({
                    error: false
                })
            }, 5000);
        }

        return (
            <div className='jumbotron container shadow-lg login'>
                <h1>Вход в аккаунт</h1>
                <p className='mt-4'>Войдите в систему, чтобы пользоваться расширенными привилегиями авторизованного пользователя.</p>
                <hr className='my-4' />

                { error ? <div className='alert alert-danger' role='alert'>
                Проверьте правильность введенных данных.
                </div> : null }

                <form onSubmit={ (e) => this.onSubmitHandler(e) }>
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
                        <label htmlFor='exampleInputPassword1'>Пароль</label>
                        <input 
                            type='password'
                            name='password'
                            className='form-control' 
                            id='exampleInputPassword1'
                            onChange={ (e) => this.onChangeHandler(e) }
                            value={ password }
                            required />
                    </div>

                    <button type='submit' className='btn btn-primary mt-2'>Войти</button>
                </form>
                
            </div>
        );
    };
};

const mapStateToProps = (store) => ({
    isAuthenticated: store.authReducer.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);