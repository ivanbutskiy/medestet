import React, { Component } from 'react';

import './error-banner.css';

class ErrorBanner extends Component {

    render() {

        return (
            <div className='error-banner text-center align-items-center'>
                <i className='fad fa-times'></i>
                <h2>Ой, произошла ошибка...</h2>
                <p>Попробуйте перезагрузить страницу чуть позже.</p>
            </div>
        );
    };
};

export default ErrorBanner;