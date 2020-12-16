import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

import './results.css';

class Results extends Component {

    state = {
        results: this.props.results,
        certificate: this.props.certificate,
        certificateImage: this.props.certificateImage
    };

    render() {

        const { results, certificate } = this.state;

        if (!certificate) {
            return (
                <div className='results'>
                    <h2 className='text-center'>После обучения</h2>
                    <div className='row align-items-center justify-content-center'>
                        <div className='results-content col'>
                            { ReactHtmlParser(results) }
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='results pb-5'>
                    <h2 className='text-center'>После обучения</h2>
                    <div className='row results-certify align-items-center justify-content-center'>
                        <div className='results-content col-md-7 mt-2'>
                            { ReactHtmlParser(results) }
                        </div>
                        <div className='col-md-5 certificate-image mt-2 text-center'>
                            <img src={ this.state.certificateImage } alt='certificate medestet' />
                        </div>
                    </div>
                </div>
            )
        }

    };
};

export default Results;