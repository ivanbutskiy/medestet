import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderAccountPages from '../../components/header-account-pages';
import ReturnAccountPage from '../../components/return-account-page';
import ChangePhoto from './components/change-photo';
import MedestetService from '../../service/medestet-service';
import NonAuth from '../non-auth';
import { loadUser } from '../../actions/auth';

import './change-user-data.css';

class ChangeUserData extends Component {

    service = new MedestetService();

    state = {
        id: '',
        email: '',
        lastName: '',
        firstName: '',
        patronym: '',
        phone: '',

        success: '',
        error: ''
    };

    updateData(
        email, 
        lastName, 
        firstName,
        patronym,
        phone) {
        this.setState({
            email, 
            lastName, 
            firstName,
            patronym,
            phone
        });
    };

    onChangeHandler(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
            error: false,
            success: false
        });
    };

    onSubmitHandler(e) {
        e.preventDefault();
        this.setState({ success: false, error: false });
        const {
            id,
            email, 
            lastName, 
            firstName,
            patronym,
            phone } = this.state;
        
        this.service.updateUserData(
            id,
            email,
            lastName,
            firstName,
            patronym,
            phone
            )
        .then(res => {
            if (res.status === 200) {
                this.setState({ success: true })
                this.updateData(
                    res.data.email, 
                    res.data.last_name, 
                    res.data.first_name,
                    res.data.patronym
                );
                this.props.loadUser();
            } else {
                this.setState({ error: true })
            }
        }).catch(error => {
            this.setState({ error: true, success: false })
        });
    };

    componentDidMount() {
        this.setState({
            id: this.props.id,
            email: this.props.email,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            patronym: this.props.patronym,
            phone: this.props.phone,    
        });
        window.scrollTo(0, 0);
    };

    render() {

        const { 
            email, 
            firstName, 
            lastName, 
            patronym,
            phone,
            success,
            error,
        } = this.state;

        if (!this.props.isAuthenticated) {
            return <NonAuth />
        };

        return (
            <div className='change-user-data shadow-lg p-2'>
                <HeaderAccountPages title={ 'Змінити особисті дані' } />
                <ReturnAccountPage />
                { success ? <div className='alert alert-success' role='alert'>
                Ваші дані успішно змінено!
                </div> : null }
                { error ? <div className='alert alert-danger' role='alert'>
                Сталася помилка. Перевірте правильність введених даних.
                </div> : null }
                <div className='container mt-3'>

                    <div className='row'>
                        <div className='col-md-8'>
                            <form className='form-group row' onSubmit={ (e) => this.onSubmitHandler(e) }>
                                <div className='col-md-6'>

                                    <label htmlFor='lastName'>Прізвище:</label>
                                    <input 
                                        type='text'
                                        name='lastName'
                                        className='form-control' 
                                        id='lastName'
                                        onChange={ (e) => this.onChangeHandler(e) }
                                        value={ lastName } />

                                    <label htmlFor='firstName'>Ім'я:</label>
                                    <input 
                                        type='text'
                                        name='firstName'
                                        className='form-control' 
                                        id='firstName'
                                        onChange={ (e) => this.onChangeHandler(e) }
                                        value={ firstName } />

                                    <label htmlFor='patronym'>По-батькові:</label>
                                    <input 
                                        type='text'
                                        name='patronym'
                                        className='form-control' 
                                        id='patronym'
                                        onChange={ (e) => this.onChangeHandler(e) }
                                        value={ patronym } />
                                </div>

                                <div className='col-md-6'>

                                    <label htmlFor='email'>Email:</label>
                                    <input 
                                        type='email'
                                        name='email'
                                        className='form-control' 
                                        id='email' 
                                        aria-describedby='emailHelp'
                                        onChange={ (e) => this.onChangeHandler(e) }
                                        value={ email } />

                                    <label htmlFor='phone'>Телефон:</label>
                                    <input 
                                        type='phone'
                                        name='phone'
                                        className='form-control' 
                                        id='phone'
                                        onChange={ (e) => this.onChangeHandler(e) }
                                        value={ phone } />

                                    <button
                                        className='btn btn-block btn-primary'
                                        type='submit'>
                                        Відправити
                                    </button>
                                </div>
                            </form>
                        </div>
                        <ChangePhoto />
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = store => ({
    id: store.authReducer.id,
    isAuthenticated: store.authReducer.isAuthenticated,
    email: store.authReducer.email,
    firstName: store.authReducer.firstName,
    lastName: store.authReducer.lastName,
    patronym: store.authReducer.patronym,
    phone: store.authReducer.phone,
})

export default connect(mapStateToProps, { loadUser })(ChangeUserData);