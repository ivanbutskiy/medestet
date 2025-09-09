import React, { Component } from 'react';
import ProductItem from '../product-item';

import './order-item.css';

class OrderItem extends Component {

    state = {
        id: this.props.id,
        orderReference: this.props.orderReference,
        orderSum: this.props.orderSum,
        orderDate: this.props.orderDate,
        products: this.props.products,
        productItems: ''
    };

    getProductItems() {
        const { products } = this.props;
        this.setState({
            productItems: products.map(product => {
                console.log(product)
                return (
                    <ProductItem
                        key={ product.product.slug }
                        slug={ product.product.slug }
                        title={ product.product.title }
                        headerImage={ product.product.header_image }
                        count={ product.count }
                        summaryPrice={ parseFloat(product.count * product.price).toFixed(2) }
                        price={ product.price }
                    />
                );
            })
        });
    };

    componentDidMount() {
        this.getProductItems();
    };

    render() {

        const { 
            orderReference, 
            orderSum,
            id,
            orderDate,
            productItems,
        } = this.state;

        return (
            <div className='card user-order-card'>
                <div id={ orderReference } className='card-header bg-white shadow-sm border-0'>
                    <h3 className='mb-0'>
                        <button type='button' data-toggle='collapse' data-target={`#collapseOne${id}`} aria-expanded='false' aria-controls='collapseOne' className='btn btn-link order-item-link'>{ `Заказ # ${ orderReference }` }</button>
                    </h3>
                </div>
                <div id={`collapseOne${id}`} aria-labelledby='headingOne' data-parent='#accordionExample' className='collapse'>
                    <div className='card-body p-5'>
                        <p><strong>Дата та час: </strong>{ orderDate }</p>
                        <p><strong>Підсумкова сума: </strong>{ orderSum } грн.</p>

                        <div className='basket-list'>
                            <div className='row'>
                                <div className='col-lg-12 p-5 card'>
                                    <div className='table-responsive'>
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th scope='col' className='border-0'>
                                                        <div className='p-2 px-3'>Продукт</div>
                                                    </th>
                                                    <th scope='col' className='border-0'>
                                                        <div className='py-2'>Вартість</div>
                                                    </th>
                                                    <th scope='col' className='border-0'>
                                                        <div className='py-2'>Кількість</div>
                                                    </th>
                                                    <th scope='col' className='border-0'>
                                                        <div className='py-2'>Сума</div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { productItems }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default OrderItem;
