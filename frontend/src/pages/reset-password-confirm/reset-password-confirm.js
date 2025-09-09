import React, { useState } from 'react';

import MedestetService from '../../service/medestet-service';
import { withRouter } from 'react-router-dom';

import './reset-password-confirm.css';


const ResetPasswordConfirm = ({ match }) => {

    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessages, setErrorMessages] = useState('');

    const [new_password, setNewPassword] = useState('');
    const [re_new_password, setReNewPassword] = useState('');

    const [new_passwordError, setNew_passwordError] = useState('')
    const [re_new_passwordError, setRe_new_passwordError] = useState('')

    const inputHandler = (e) => {
        setSuccessMessage(false);
        setErrorMessages('');

        if (e.target.name === 'new_password') {
            setNewPassword(e.target.value);
            setNew_passwordError('')
        } else {
            setReNewPassword(e.target.value);
            setRe_new_passwordError('');
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setNew_passwordError('');
        setRe_new_passwordError('');

        const data = {
            new_password,
            re_new_password,
            uid: match.params.uid,
            token: match.params.token
        };

        const service = new MedestetService();
        service.resetPasswordConfirm(data)
            .then(res => {
                setSuccessMessage(true)
            })
            .catch(err => {
                let errData = err.response.data;
                if (errData.new_password) {
                    setNew_passwordError(errData.new_password.join(' '))
                } else if (errData.new_password) {
                    setRe_new_passwordError(errData.re_new_password.join(' '))
                };
            })
    }

    return (
        <div className='jumbotron shadow-lg register mb-0'>
            <h1>Придумайте новий пароль</h1>
            <p className='mt-4'>Після того як ви створите новий пароль, ви зможете успішно авторизуватися на сайті.</p>

            { successMessage && <div className='alert alert-success' role='alert'>
                Пароль успішно змінено! Ви можете увійти під новим паролем!
            </div>}

            { errorMessages && <div className='alert alert-danger' role='alert'>{errorMessages}</div>}

            <hr className='my-4' />
            <form onSubmit={e => onSubmitHandler(e)}>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor='exampleInputPassword1'>Новий пароль</label>
                            <input
                                type='password'
                                name='new_password'
                                className='form-control'
                                id='exampleInputPassword1'
                                aria-describedby='passwordHelp'
                                onChange={ (e) => inputHandler(e) }
                                value={ new_password }
                                required />
                            {new_passwordError && <span className='small-error-message'>{new_passwordError}</span>}
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor='exampleInputPassword2'>Повторіть пароль</label>
                            <input
                                type='password'
                                name='re_new_password'
                                className='form-control'
                                id='exampleInputPassword2'
                                aria-describedby='passwordHelp'
                                onChange={ (e) => inputHandler(e) }
                                value={ re_new_password }
                                required />
                            {re_new_passwordError && <span className='small-error-message'>{re_new_passwordError}</span>}
                        </div>
                    </div>
                    <button type='submit' className='btn btn-primary ml-3'>Змінити пароль</button>
                </div>
            </form>

        </div>
    );
};

export default withRouter(ResetPasswordConfirm);
