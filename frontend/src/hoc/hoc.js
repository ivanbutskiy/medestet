import React, { Component, Fragment } from 'react';
import Sidebar from './sidebar';
import { connect } from 'react-redux';
import { loadUser, checkAuthenticated } from '../actions/auth';

class Hoc extends Component {

    constructor(props) {
        super(props);
        props.checkAuthenticated();
        props.loadUser()
    };

    render() {
        return (
            <Fragment>
                <Sidebar sidebarChildren={ this.props.children } />
            </Fragment>
        );
    };
};

const mapDispatchToProps = {
    checkAuthenticated,
    loadUser
};

export default connect(null, mapDispatchToProps)(Hoc);