import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../actions/auth';


class Userbar extends Component {

    render() {

        return (
            <Fragment>
                <p className='text-gray text-uppercase px-3 small pb-4 mb-0'>Аккаунт</p>

                <ul className='nav flex-column bg-white mb-0'>

                    <li className='nav-item'>
                        <a href='/' className='nav-link text-dark'>
                            <i className='fa fa-th-large mr-3 text-primary fa-fw'></i>
                            Home
                        </a>
                    </li>

                    <li className='nav-item'>
                        <a href='/' className='nav-link text-dark'>
                            <i className='fa fa-address-card mr-3 text-primary fa-fw'></i>
                            About
                        </a>
                    </li>

                    <li className='nav-item'>
                        <a href='/' className='nav-link text-dark'>
                            <i className='fa fa-cubes mr-3 text-primary fa-fw'></i>
                            Services
                        </a>
                    </li>
                    
                    <li className='nav-item'>
                        <Link 
                            to='/' 
                            className='nav-link text-dark'
                            onClick={ () => this.props.logout() }>
                            <i className='fas fa-sign-out-alt mr-3 text-primary fa-fw'></i>
                            Выйти
                        </Link>
                    </li>

                </ul>
            </Fragment>
        );
    };
};

export default connect(null, { logout })(Userbar);