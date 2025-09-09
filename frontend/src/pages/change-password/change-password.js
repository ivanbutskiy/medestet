import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderAccountPages from '../../components/header-account-pages';
import ReturnAccountPage from '../../components/return-account-page';
import MedestetService from '../../service/medestet-service';
import NonAuth from '../non-auth';

import './change-password.css';

class ChangePassword extends Component {

    state = {
        success: '',
        error: '',

        currentPassword: '',
        newPassword: '',
        reNewPassword: '',

        notValid: ''
    };

    service = new MedestetService();

    onChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value,
            error: false,
            success: false,
            notValid: false
        });
    };

    clearFields() {
        this.setState({
            currentPassword: '',
            newPassword: '',
            reNewPassword: ''
        })
    }

    onSubmitHandler(e) {
        e.preventDefault();
        this.setState({ success: false, error: false });
        const {
            currentPassword,
            newPassword,
            reNewPassword } = this.state;
        if (newPassword === reNewPassword) {

            this.service.changePassword(
                currentPassword, 
                newPassword, 
                reNewPassword
                )
            .then(res => {
            console.log(res);
            if (res.status === 204) {
                this.setState({ success: true })
                this.clearFields();
                } else {
                    this.setState({ error: true })
                    this.clearFields();
                }
            }).catch(error => {
                this.setState({ error: true, success: false })
                this.clearFields();
            });
        } else {
            this.setState({ notValid: true })
        };
    };

    componentDidMount() {
        window.scrollTo(0, 0);
    };

    render() {

        const { 
            notValid,
            success, 
            error,
            currentPassword,
            newPassword,
            reNewPassword } = this.state;

        if (!this.props.isAuthenticated) {
            return <NonAuth />
        };

        return (
            <div className='change-user-data shadow-lg p-2'>
                <HeaderAccountPages title={ 'Змінити пароль' } />
                <ReturnAccountPage />
                { success ? <div className='alert alert-success' role='alert'>
                Ваш пароль успішно змінено!
                </div> : null }
                { error ? <div className='alert alert-danger' role='alert'>
                Сталася помилка. Спробуйте повторити знову або обрати більш складний пароль.
                </div> : null }
                { notValid ? <div className='alert alert-danger' role='alert'>
                Введені паролі не співпадають.
                </div> : null }
                <div className='container mt-3'>

                    <div className='row justify-content-center'>
                        <div className='col-md-6'>
                            <form className='form-group' onSubmit={ (e) => this.onSubmitHandler(e) }>
                                    <label htmlFor='currentPassword'>Введіть поточний пароль:</label>
                                    <input 
                                        type='password'
                                        name='currentPassword'
                                        className='form-control' 
                                        id='currentPassword'
                                        onChange={ (e) => this.onChangeHandler(e) }
                                        value={ currentPassword }
                                        required
                                    />

                                    <label htmlFor='newPassword'>Введіть новий пароль:</label>
                                    <input 
                                        type='password'
                                        name='newPassword'
                                        className='form-control' 
                                        id='newPassword'
                                        onChange={ (e) => this.onChangeHandler(e) }
                                        value={ newPassword } 
                                        required
                                    />

                                    <label htmlFor='reNewPassword'>Повторіть новий пароль:</label>
                                    <input 
                                        type='password'
                                        name='reNewPassword'
                                        className='form-control' 
                                        id='reNewPassword'
                                        onChange={ (e) => this.onChangeHandler(e) }
                                        value={ reNewPassword } 
                                        required
                                    />

                                    <button
                                        className='btn btn-block btn-primary'
                                        type='submit'>
                                        Змінити пароль
                                    </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = store => ({
    isAuthenticated: store.authReducer.isAuthenticated,
})

export default connect(mapStateToProps, null)(ChangePassword);