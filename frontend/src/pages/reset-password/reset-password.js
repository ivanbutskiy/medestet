import React, { useState } from 'react';

import MedestetService from '../../service/medestet-service';

import './reset-password.css';


const ResetPassword = () => {

    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState(false)
    const [errorMessages, setErrorMessages] = useState('')

    const inputEmailHandler = (e) => {
        setEmail(e.target.value)
        setErrorMessages('')
        setSuccessMessage(false)
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const service = new MedestetService();
        service.resetPassword(email)
            .then(res => {
                setSuccessMessage(true);
            })
            .catch(e => {
                let errMessages = e.response.data.join(' ');
                setErrorMessages(errMessages);
            })
    }

    return (
        <div className='jumbotron shadow-lg register mb-0'>
            <h1>Сброс пароля</h1>
            <p className='mt-4'>Введите свой email и после нажатия на кнопку вам на почту придет инструкция с восстановлением пароля.</p>

            { successMessage && <div className='alert alert-success' role='alert'>
                На вашу почту {email} была отправлена инструкция с восстановлением пароля
            </div>
            }

            { errorMessages && <div className='alert alert-danger' role='alert'>{errorMessages}</div>}

            <hr className='my-4' />
            <form onSubmit={ e => onSubmitHandler(e) }>
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
                                onChange={ (e) => inputEmailHandler(e) }
                                value={ email }
                                required />
                        </div>
                        <button type='submit' className='btn btn-primary'>Сбросить пароль</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;
