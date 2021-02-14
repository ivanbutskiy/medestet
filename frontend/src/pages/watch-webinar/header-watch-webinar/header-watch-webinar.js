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
                className='jumbotron shadow-sm card header-watch-course'
                style={{ backgroundImage:`url(${ headerImage })` }}>
                <h1>{ title }</h1>
            </div>
        );
    };
};

export default HeaderWatchWebinar;
