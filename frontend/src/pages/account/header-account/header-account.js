import React, { Component } from 'react';
import cosmetolog from '../../../assets/cosmetolog.jpg';
import './header-account.css';

class HeaderAccount extends Component {

    render() {

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
                            <p className='mt-4 mb-2'>Сумма покупок: { this.props.buySum }</p>
                            <p className='mt-2 mb-2'>Количество покупок: { this.props.buyCount }</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default (HeaderAccount);
