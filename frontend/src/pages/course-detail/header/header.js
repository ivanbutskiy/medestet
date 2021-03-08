import React, { Component } from 'react';

import './header.css';

class Header extends Component {

    render() {
        return (
            <div 
                className='row align-items-center course-header shadow-sm card'
                style={{
                    backgroundImage: `url(${ this.props.headerImage })`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    backgroundBlendMode: 'color-dodge'}}>
                <div className='col-md-10'>
                    <h1>{ this.props.title }</h1>
                    <p className='mt-4'>{ this.props.subtitle }</p>
                    <div className='row course-detail-info mt-4'>
                        <div className='col-md-6'>
                            <p><i className='fas fa-calendar-week mr-2'></i>Дата начала: { this.props.startingDate }</p>
                        </div>
                        <div className='col-md-6'>
                            <p><i className='fas fa-tags mr-2'></i>Стоимость: { this.props.price } грн.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default Header;