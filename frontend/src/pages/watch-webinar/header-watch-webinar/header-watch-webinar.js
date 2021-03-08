import React, { Component } from 'react';

import './header-watch-webinar.css';

class HeaderWatchWebinar extends Component {

    state = {
        title: this.props.title,
        headerImage: this.props.headerImage
    }
    
    render() {

        const { title, headerImage } = this.state;

        return (
            <div 
                className='shadow-sm card header-watch-webinar'
                style={{ backgroundImage:`url(${headerImage})` }}>
                <div className='row container'>
                    <div className='col-md-10'>
                        <h1>{ title }</h1>
                    </div>
                </div>
            </div>
        );
    };
};

export default HeaderWatchWebinar;
