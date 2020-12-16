import React, { Component } from 'react';

import './header-courses-list.css';

class HeaderCoursesList extends Component {
    
    render() {

        return (
            <div 
                className='jumbotron jumbotron-fluid shadow-sm header-courses-list'>
                <div className='container'>
                    <h1 className='display-4'>Онлайн-курсы компании MedEstet</h1>
                </div>
            </div>
        );
    };
};

export default HeaderCoursesList;