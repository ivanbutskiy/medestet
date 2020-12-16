import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import UserPanel from '../user-panel';
import GuestPanel from '../guest-panel';
import Userbar from '../userbar';

import './sidebar.css';

class Sidebar extends Component {

    render() {

        return (
            <Fragment>
                <div className='vertical-nav bg-white' id='sidebar'>
                
                    { this.props.isAuthenticated ? <UserPanel/> : <GuestPanel/> }

                    { this.props.isAuthenticated ? <Userbar /> : null }

                    <p className='text-gray text-uppercase px-3 small py-4 mb-0'>Сервисы MedEstet</p>

                    <ul className='nav flex-column bg-white mb-0'>
                        <li className='nav-item'>
                            <Link to='/courses/'
                                className='nav-link text-dark'>
                                <i className='fas fa-chalkboard-teacher mr-3 text-primary fa-fw'></i>
                                Курсы
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/workshops/'
                                className='nav-link text-dark'>
                                <i className='fas fa-user-friends mr-3 text-primary fa-fw'></i>
                                Семинары
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/webinars/'
                                className='nav-link text-dark'>
                                <i className='fas fa-globe mr-3 text-primary fa-fw'></i>
                                Вебинары
                            </Link>
                        </li>
                        
                        <li className='nav-item'>
                        <a href='/' className='nav-link text-dark'>
                                    <i className='fa fa-line-chart mr-3 text-primary fa-fw'></i>
                                    Line charts
                                </a>
                        </li>
                    </ul>
                </div>
    
                <div className='page-content' id='content'>
                    <button 
                        id='sidebarCollapse' 
                        type='button' 
                        className='btn btn-light bg-white rounded-pill shadow-sm px-4 mb-4 mt-3 ml-3'>
                        <i className='fa fa-bars mr-2'></i>
                        <small className='text-uppercase font-weight-bold'>Меню</small>
                    </button>

                        { this.props.sidebarChildren }

                </div>
            </Fragment>
        );
    };
};

const mapStateToProps = (store) => ({
    isAuthenticated: store.authReducer.isAuthenticated
});

export default connect(mapStateToProps, null)(Sidebar);