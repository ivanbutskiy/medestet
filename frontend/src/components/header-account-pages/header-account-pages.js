import React, { Component } from 'react';

import './header-account-pages.css';

class HeaderAccountPages extends Component {

    state = {
        title: this.props.title
    }

    render() {

        return (
            <div className='card shadow-sm header-account-pages'>
                <h1>{ this.state.title }</h1>
            </div>
        );
    };
};

export default HeaderAccountPages;