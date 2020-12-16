import React, { Component } from 'react';
import { connect } from 'react-redux';

import './user-panel.css';

class UserPanel extends Component {

    render() {

        return (
            <div className='py-4 px-3 mb-4 bg-light'>
                <div className='media d-flex align-items-center'><img src='https://res.cloudinary.com/mhmd/image/upload/v1556074849/avatar-1_tcnd60.png' alt='...' width='65' className='mr-3 rounded-circle img-thumbnail shadow-sm' />
                    <div className='media-body'>
                        <h4 className='m-0'>{ this.props.firstName }</h4>
                        <p className='font-weight-light text-muted mb-0'>Web developer</p>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (store) => ({
    firstName: store.authReducer.firstName
});

export default connect(mapStateToProps, null)(UserPanel);