import React, { Component } from 'react';

import './option-item.css';

class OptionItem extends Component {

    state = {
        title: this.props.title,
        description: this.props.description,
        price: this.props.price,
        old_price: this.props.old_price
    }

    render() {

        const { title, description, price, old_price } = this.state;

        return (

            <div className='col-lg-4 mb-5 mb-lg-0 option-item'>
                <div className='bg-white p-5 rounded-lg shadow option-item-detail'>
                    <h4 className='h5 mb-4'>{ title }</h4>

                    { old_price && old_price > 0 ? <p><i className='fas fa-tags mr-2 old-price'></i>Без скидки: { old_price } грн.</p> : null }
                    { old_price && old_price > 0 ? <p><i className='fas fa-tags mr-2 new-price'></i>Зі скидкою: { price } грн.</p> : null }
                    { !old_price && <p><i className='fas fa-tags mr-2 old-price'></i>Вартість: { price } грн.</p> }
                    { !price || price === 0 ? <p><i className='fas fa-tags mr-2 old-price'></i>Безкоштовно</p> : null }

                    <div className='custom-separator my-4 mx-auto bg-primary description'></div>
                        { description ? description : null }
                </div>
            </div>

        );
    };
};

export default OptionItem;