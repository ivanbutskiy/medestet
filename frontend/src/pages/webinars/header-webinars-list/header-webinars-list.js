import React, { Component } from 'react';

import './header-webinars-list.css';

class HeaderWebinarsList extends Component {
    
    render() {

        return (
            <div 
                className='jumbotron jumbotron-fluid shadow-sm header-workshops-list'>
                <div className='container'>
                    <h1 className='display-4'>Вебинары компании MedEstet</h1>
                </div>
            </div>
        );
    };
};

export default HeaderWebinarsList;