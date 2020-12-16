import React, { Component } from 'react';

import './option-item.css';

class OptionItem extends Component {

    state = {
        title: this.props.title,
        description: this.props.description,
        price: this.props.price,
        isPaid: this.props.isPaid
    }

    render() {

        const { title, description, price, isPaid } = this.state;

        return (

            <div className='col-lg-4 mb-5 mb-lg-0 option-item'>
                    
                        <div className='bg-white p-5 rounded-lg shadow option-item-detail'>
                            <h4 className='h5 mb-4'>{ title }</h4>

                            { isPaid ? <p><i className='fas fa-tags mr-2'></i>Стоимость: { price } грн.</p> : null }

                            <div className='custom-separator my-4 mx-auto bg-primary description'></div>
                                
                                    { description }
                                
                            <button className='btn btn-primary btn-block p-2 shadow mt-5'>Записаться</button>
                        </div>
            </div>

        );
    };
};

export default OptionItem;