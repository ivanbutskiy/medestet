import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

import './description.css';

class Description extends Component {

    render() {

        const { description, descriptionImage } = this.props;

        return (

            <div className='detail-description mt-5'>
                
                <h2>Подробнее о вебинаре</h2>

                <div className='row align-items-center justify-content-center'>
                    <div className='col-md-7 mt-2'>
                        { ReactHtmlParser(description) }
                    </div>
                    <div className='col-md-5 text-center mt-2'>
                        <img src={ descriptionImage } alt='About course text' />
                    </div>
                </div>

            </div>
        );
    };
};

export default Description;