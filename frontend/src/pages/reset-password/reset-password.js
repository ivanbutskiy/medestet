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
            <h1>Відновлення пароля</h1>
            <p className='mt-4'>Введіть свою електронну адресу, і після натискання на кнопку вам на пошту надійде інструкція з відновленням пароля.</p>

            { successMessage && <div className='alert alert-success' role='alert'>
                На вашу пошту {email} була надіслана інструкція з відновленням пароля
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
                        <button type='submit' className='btn btn-primary'>Відновити пароль</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;
