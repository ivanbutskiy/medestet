import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './return-account-page.css';

class ReturnAccountPage extends Component {

    render() {

        return (
            <div className='alert alert-primary return-account-page' role='alert'>
                <Link to='/account/'>
                    <i className='fal fa-arrow-circle-left mr-2'></i>
                    Повернутися в мій акаунт
                </Link>
            </div>
        );
    };
};

export default ReturnAccountPage;