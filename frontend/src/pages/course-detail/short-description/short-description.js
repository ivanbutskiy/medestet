import React, { Component } from 'react';

import './short-description.css';

class ShortDescription extends Component {


    render() {

        const { shortDescription, previewImage, title } = this.props;

        return (
            <div className='container'>
                <div className='row short-description align-items-center justify-content-center'>
                    <div className='col-md-6 mt-3'>
                        <p>{ shortDescription }</p>
                    </div>
                    <div className='col-md-6 short-description-image mt-3 text-center'>
                        <img 
                            className=''
                            src={ previewImage } 
                            alt={ title } />
                    </div>
                </div>
            </div>

        );
    };
};

export default ShortDescription;