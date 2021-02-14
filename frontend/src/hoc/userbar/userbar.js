import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../actions/auth';

import './userbar.css';

class Userbar extends Component {

    state = {
        countProductsInBasket: this.props.count
    };

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({ countProductsInBasket: this.props.count });
        };
    };

    render() {

        const { countProductsInBasket } = this.state;

        return (
            <Fragment>
                {/* <p className='text-gray text-uppercase px-3 small pb-4 mb-0'>Аккаунт</p> */}

                <ul className='nav flex-column bg-white mb-0'>

                    <li className='nav-item align-items-center'>
                        <Link 
                            to='/account/' 
                            className='nav-link text-dark'>
                            <i className='fas fa-user-circle mr-3 text-primary fa-fw'></i>
                            Аккаунт
                        </Link>
                    </li>

                    <li className='nav-item align-items-center'>
                        <Link 
                            to='/basket/' 
                            className='nav-link text-dark'>
                            <i className='fas fa-shopping-basket mr-3 text-primary fa-fw'></i>
                            Корзина{ countProductsInBasket ? <span className='badge badge-secondary ml-1 basket-count-badge'>{ countProductsInBasket }</span> : null }
                        </Link>
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

const mapStateToProps = store => ({
    count: store.basketReducer.count
})

export default connect(mapStateToProps, { logout })(Userbar);