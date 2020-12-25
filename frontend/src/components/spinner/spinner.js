import React, { Component } from 'react';

import './spinner.css';

class Spinner extends Component {

    render() {
        return (
            <div className='spinner text-center align-items-center'>
                <div className='spinner-content'>
                    <div className='spinner-border text-info' role='status'>
                        <span className='sr-only'>Loading...</span>
                    </div>
                    <h2 className='mt-4'>Загрузка...</h2>
                </div>
            </div>
        );
    };
};

export default Spinner;