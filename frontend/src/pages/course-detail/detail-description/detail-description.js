import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

import './detail-description.css';

class DetailDescription extends Component {

    render() {

        const { detailDescription, detailImage } = this.props;

        return (

            <div className='detail-description mt-5'>
                
                <h3>Подробнее о курсе</h3>

                <div className='row align-items-center justify-content-center'>
                    <div className='col-md-7 mt-2'>
                        { ReactHtmlParser(detailDescription) }
                    </div>
                    <div className='col-md-5 text-center mt-2'>
                        <img src={ detailImage } alt='About course text' />
                    </div>
                </div>

            </div>
        );
    };
};

export default DetailDescription;