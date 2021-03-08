import React, { Component } from 'react';
import cosmetolog from '../../../assets/cosmetolog.jpg';
import './header-account.css';

class HeaderAccount extends Component {

    render() {

        const getDiscountPercent = () => {
            if (this.props.buySum >= 18000) {
                return 5;
            } else if (this.props.buySum >= 5000) {
                return 3;
            } else {
                return 0;
            };
        };

        return (
            <div className='card shadow-sm header-account'>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col-sm-3'>
                            <img 
                                src={ this.props.photo ? this.props.photo : cosmetolog } 
                                alt='Medestet User' 
                                className='rounded-circle  shadow-sm' />
                        </div>
                        <div className='col-sm-9'>
                            <h1>{ this.props.firstName } { this.props.lastName }</h1>
                            <p className='mt-4 mb-2'>Сумма покупок: { this.props.buySum } грн</p>
                            <p className='mt-2 mb-2'>Количество покупок: { this.props.buyCount }</p>
                            <p className='mt-2 mb-2'>Скидка: { getDiscountPercent() } %</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default (HeaderAccount);
