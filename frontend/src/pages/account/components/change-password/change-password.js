import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './change-password.css';

class ChangePassword extends Component {

    render() {

        return (
            <div className='personal-data col-sm-6 col-md-4 text-center'>
                <div className='card shadow-sm p-3'>
                    <i className='fas fa-key'></i>
                    <Link to='/account/password/'>Змінити пароль</Link>
                </div>
            </div>
        );
    };
};

export default ChangePassword;