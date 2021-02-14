import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './personal-data.css';

class PersonalData extends Component {

    render() {

        return (
            <div className='personal-data col-sm-6 col-md-4 text-center'>
                <div className='card shadow-sm p-3'>
                    <i className='fas fa-user-circle'></i>
                    <Link to='/account/profile/'>Личные данные и фото</Link>
                </div>
            </div>
        );
    };
};

export default PersonalData;