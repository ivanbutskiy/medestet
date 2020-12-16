import React, { Component } from 'react';

import './theme-item.css'

class ThemeItem extends Component {

    state = {
        title: this.props.title,
        shortDescription: this.props.shortDescription,
    }

    render() {
        
        const { title, shortDescription } = this.state;

        return (
            
            <li className='timeline-item bg-white rounded ml-3 p-4 shadow'>
                <div className='timeline-arrow'></div>
                <h4 className='h5 mb-0'>{ title }</h4>

                <p className='lesson-description mt-3 font-weight-light'>{ shortDescription }</p>
            </li>

        );
    };
};

export default ThemeItem;