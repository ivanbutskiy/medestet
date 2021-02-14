import React, { Component, Fragment } from 'react';

import './delivery-methods.css';

class DeliveryMethods extends Component {

    state = {
        id: this.props.id,
        title: this.props.title,
        image: this.props.image
    };

    deliveryMethodsHandler(e) {
        const { id } = this.state;
        this.props.deliveryMethodsHandler(id);
    };

    render() {

        const { title, image } = this.state;

        return (
            <Fragment>
                <div className='row delivery-shop-method align-items-center container shadow-sm'>
                    <div className='col-md-6'>
                        <input 
                            className='form-check-input' 
                            type='radio' 
                            name={ 'delivery-method' } 
                            id={ title } 
                            value={ title }
                            onChange={ () => this.deliveryMethodsHandler() }
                            required 
                            />
                        <label
                            className='form-check-label' 
                            htmlFor={ title }>
                            { title }
                        </label>
                        <hr></hr>
                    </div>
                    <div className='col-md-6 text-center'>
                        <img className='delivery-shop-method-image' src={ image } alt={ title } />
                    </div>
                </div>
            </Fragment>
        );
    };
};

export default DeliveryMethods;