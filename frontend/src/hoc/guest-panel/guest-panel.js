import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { hideMenu } from '../../actions/utils';

import './guest-panel.css';

class GuestPanel extends Component {

    render() {
        return (
            <div className='py-4 px-3'>
                <div className='media d-flex align-items-center'>
                    <div className='media-body'>
                        <ul className='nav flex-column mb-0'>
                            <li className='nav-item'>
                                <Link to='/login/' className='nav-link text-dark' onClick={ ()=> hideMenu() }>
                                <i className='fas fa-sign-in-alt mr-3 text-primary fa-fw'></i>
                                Вхід
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/register/' className='nav-link text-dark ' onClick={ ()=> hideMenu() }>
                                <i className='fas fa-user-plus mr-3 text-primary fa-fw'></i>
                                Реєстрація
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