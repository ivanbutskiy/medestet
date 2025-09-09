import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './webinars.css';

class Webinars extends Component {

    render() {

        return (
            <div className='personal-data col-sm-6 col-md-4 text-center'>
                <div className='card shadow-sm p-3'>
                    <i className='fas fa-globe'></i>
                    <Link to='/account/webinars/'>Мої вебінари</Link>
                </div>
            </div>
        );
    };
};

export default Webinars;