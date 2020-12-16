import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

import './location.css';

class Location extends Component {

    render() {

        const { location, locationImage } = this.props;

        return (

            <div className='workshop-location mt-5'>
                
                <h2><i className='far fa-map-marker-check mr-2'></i>Место проведения</h2>

                <div className='row align-items-center justify-content-center'>
                    <div className='col-md-7 mt-2 text-center'>
                        { ReactHtmlParser(location) }
                    </div>
                    <div className='col-md-5 text-center mt-2'>
                        <img src={ locationImage } alt='About course text' />
                    </div>
                </div>

            </div>
        );
    };
};

export default Location;