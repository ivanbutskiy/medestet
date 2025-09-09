import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './certify.css';

class Certify extends Component {

    render() {

        return (
            <div className='personal-data col-sm-6 col-md-4 text-center'>
                <div className='card shadow-sm p-3'>
                    <i className='fas fa-file-certificate'></i>
                    <Link to='/account/certify/'>Сертифікація</Link>
                </div>
            </div>
        );
    };
};

export default Certify;