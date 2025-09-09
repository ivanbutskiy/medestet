import React, { Component } from 'react';

import './error-banner.css';

class ErrorBanner extends Component {

    render() {

        return (
            <div className='error-banner text-center align-items-center'>
                <i className='fad fa-times'></i>
                <h2>Ой, трапилась помилка...</h2>
                <p>Спробуйте перезавантажити сторінку дещо пізніше</p>
            </div>
        );
    };
};

export default ErrorBanner;