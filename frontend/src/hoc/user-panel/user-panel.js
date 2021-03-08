import React, { Component } from 'react';
import { connect } from 'react-redux';
import cosmetolog from '../../assets/cosmetolog.jpg';

import './user-panel.css';

class UserPanel extends Component {

    render() {

        return (
            <div className='py-4 px-3 row align-items-center user-panel'>
                <div className='media d-flex col'><img src={ this.props.photo ? this.props.photo : cosmetolog } alt='Medestet' className='rounded-circle shadow-sm' />
                <div className='media-body col'>
                    <h4 className='m-0 user-first-name'>{ this.props.firstName }</h4>
                    { this.props.isCertified ? <p className='user-certified mt-2'>Сертифицированный косметолог</p> : <p className='user-not-certified mt-2'>Без сертификата</p> }
                </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (store) => ({
    firstName: store.authReducer.firstName,
    photo: store.authReducer.photo,
    isCertified: store.authReducer.isCertified
});

export default connect(mapStateToProps, null)(UserPanel);