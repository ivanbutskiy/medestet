import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './shopping.css';

class Shopping extends Component {

    render() {

        return (
            <div className='personal-data col-sm-6 col-md-4 text-center'>
                <div className='card shadow-sm p-3'>
                    <i className='fas fa-store'></i>
                    <Link to='/account/shopping/'>Мої покупки</Link>
                </div>
            </div>
        );
    };
};

export default Shopping;