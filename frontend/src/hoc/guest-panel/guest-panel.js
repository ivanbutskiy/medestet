import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './guest-panel.css';

class GuestPanel extends Component {

    render() {
        return (
            <div className='py-4 px-3 mb-4 bg-light'>
                <div className='media d-flex align-items-center'>
                    <div className='media-body'>
                        <ul className='nav flex-column mb-0'>
                            <li className='nav-item'>
                                <Link to='/login/' className='nav-link text-dark '>
                                <i className='fas fa-sign-in-alt mr-3 text-primary fa-fw'></i>
                                Вход
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/register/' className='nav-link text-dark '>
                                <i className='fas fa-user-plus mr-3 text-primary fa-fw'></i>
                                Регистрация
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    };
};

export default GuestPanel;