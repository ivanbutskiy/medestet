import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { login } from '../../actions/auth';

import './login.css';

class Login extends Component {

    state = {
        email: '',
        password: '',

        errorMessage: null
    };

    onChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value,
            errorMessage: ''
        });
    };

    onSubmitHandler(e) {
        e.preventDefault();
        const { email, password } = this.state;
        this.props.login(email, password)
            .catch(error => {
                const message = error.response.data;
                for (let mes in message) {
                    this.setState({ errorMessage: message[mes] });
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

        const { email, password, errorMessage } = this.state;

        if (errorMessage) {
            setTimeout(() => {
                this.setState({
                    errorMessage: false
                })
            }, 5000);
        };

        return (
            <div className='jumbotron shadow-lg login mb-0'>
                <h1>Вхід в обліковий запис</h1>
                <p className='mt-4'>Увійдіть в систему, щоб користуватися розширеними привілеями авторизованого користувача.</p>
                <hr className='my-4' />

                { errorMessage ? 
                    <div 
                        className='alert alert-danger' 
                        role='alert'>{ errorMessage }
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

                    <button type='submit' className='btn btn-primary mt-2'>Увійти</button>
			<p style={{ marginBottom: 0, marginTop: '2rem' }}>Забули пароль?</p>
                    	<Link to='/reset-password'>Відновіть його в декілька кліків</Link>

                </form>
                
            </div>
        );
    };
};

const mapStateToProps = (store) => ({
    isAuthenticated: store.authReducer.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
