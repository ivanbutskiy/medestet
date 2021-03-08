import React, { Component } from 'react';

import './header-news.css';

class HeaderNews extends Component {

    render() {

        return (
            <div className='jumbotron shadow-sm card header-news'>
                <h1>Новости компании MedEstet</h1>
            </div>
        );
    };
};

export default HeaderNews;