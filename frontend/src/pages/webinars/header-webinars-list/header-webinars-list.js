import React, { Component } from 'react';

import './header-webinars-list.css';

class HeaderWebinarsList extends Component {
    
    render() {

        return (
            <div className='jumbotron shadow-sm card header-webinars-list'>
                <h1>Вебинары компании MedEstet</h1>
            </div>
        );
    };
};

export default HeaderWebinarsList;