import React, { Component } from 'react';

import './spinner.css';

class Spinner extends Component {

    render() {
        return (
            <div className='spinner text-center mt-5 shadow-lg row align-items-center justify-content-center'>
                <div className='spinner-content'>
                    <div className='spinner-border text-info' role='status'>
                        <span className='sr-only'>Loading...</span>
                    </div>
                    <h1 className='mt-4'>Загрузка...</h1>
                </div>
            </div>
        );
    };
};

export default Spinner;