import React, { Component } from 'react';

import './header.css';

class Header extends Component {

    render() {
        return (
            <div 
                className='row align-items-center workshop-header shadow-sm'
                style={{
                    backgroundImage: `url(${ this.props.headerImage })`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    backgroundBlendMode: 'color-dodge'}}>
                <div className='col-md-8'>
                    <h1>{ this.props.title }</h1>
                    <p className='mt-4'>{ this.props.subtitle }</p>
                    <div className='course-detail-info'>
                        <p><i className='fas fa-calendar-week mr-2 mt-4 course-detail-info'></i>Дата начала: { this.props.startingDate }</p>
                    </div>
                </div>
            </div>
        );
    };
};

export default Header;