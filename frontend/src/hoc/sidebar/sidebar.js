import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo_medestet from '../../assets/logo_medestet.png';

import UserPanel from '../user-panel';
import GuestPanel from '../guest-panel';
import Userbar from '../userbar';
import Guestbar from '../guestbar';
import Footer from '../footer';

import './sidebar.css';

class Sidebar extends Component {

    render() {

        return (
            <Fragment>
                <div className='vertical-nav bg-white' id='sidebar'>
                    <Link to='/'>
                        <div className='logo-medestet'>
                            <img src={ logo_medestet } alt='medestet logo' />
                        </div>
                    </Link>
                
                    { this.props.isAuthenticated ? <UserPanel/> : <GuestPanel/> }

                    { this.props.isAuthenticated ? <Userbar /> : <Guestbar /> }

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
                            <Link to='/shop/' 
                                className='nav-link text-dark'>
                                <i className='fas fa-store mr-3 text-primary fa-fw'></i>
                                Магазин
                            </Link>
                        </li>
                        
                        <li className='nav-item'>
                            <Link to='/video/' 
                                className='nav-link text-dark'>
                                <i className='fas fa-video mr-3 text-primary fa-fw'></i>
                                Видео
                            </Link>
                        </li>
                        
                        <li className='nav-item'>
                            <Link to='/news/' 
                                className='nav-link text-dark'>
                                <i className='fas fa-newspaper mr-3 text-primary fa-fw'></i>
                                Новости
                            </Link>
                        </li>
                        
                        <li className='nav-item'>
                            <Link to='/blog/' 
                                className='nav-link text-dark'>
                                <i className='fas fa-blog mr-3 text-primary fa-fw'></i>
                                Блог
                            </Link>
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
                    <div className='children'>
                        { this.props.sidebarChildren }
                        <Footer/>
                    </div>
                </div>
            </Fragment>
        );
    };
};

const mapStateToProps = (store) => ({
    isAuthenticated: store.authReducer.isAuthenticated
});

export default connect(mapStateToProps, null)(Sidebar);