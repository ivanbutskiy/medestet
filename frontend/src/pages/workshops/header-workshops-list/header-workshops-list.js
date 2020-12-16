import React, { Component } from 'react';

import './header-workshops-list.css';

class HeaderWorkshopsList extends Component {
    
    render() {

        return (
            <div 
                className='jumbotron jumbotron-fluid shadow-sm header-workshops-list'>
                <div className='container'>
                    <h1 className='display-4'>Семинары компании MedEstet</h1>
                </div>
            </div>
        );
    };
};

export default HeaderWorkshopsList;