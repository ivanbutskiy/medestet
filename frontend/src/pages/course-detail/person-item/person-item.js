import React, { Component } from 'react';

import './person-item.css';

class PersonItem extends Component {

    render() {

        const { imagePerson, personTitle, personDetail } = this.props;

        return (
            <div className='col-xl-3 col-sm-6 mb-5'>
                <div className='person-item bg-white rounded shadow-sm py-5 px-4'>
                    <img src={ imagePerson } alt={ personTitle } width='100' className='mb-3' />
                    <h5 className='mb-0'>{ personTitle }</h5>
                    <p className='mt-2'>{ personDetail }</p>
                </div>
            </div>
        );
    };
};

export default PersonItem;