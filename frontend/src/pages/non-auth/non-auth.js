import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './non-auth.css';

class NonAuth extends Component {

    render() {

        if (this.props.isAuthenticated) {
            return <Redirect to='/' />
        };

        return (
            <div className='shop-page shadow-lg p-2'>
                <div className='container mb-4 align-items-center text-center success-payment-page'>
                    <div className='content'>
                        <i className='fad fa-users'></i>
                        <h2 className='mt-3'>Эта страница доступна только авторизированным пользователям</h2>
                        <p className='mt-2'>Пройдите <Link to='/login/'>авторизацию</Link> или <Link to='/register/'>зарегистрируйтесь</Link>, если у вас еще нет аккаунта.</p>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = store => ({
    isAuthenticated: store.authReducer.isAuthenticated
});

export default connect(mapStateToProps, null)(NonAuth);