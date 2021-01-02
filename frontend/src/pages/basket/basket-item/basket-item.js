import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './basket-item.css';

class BasketItem extends Component {

    state = {
        slug: '',
        title: '',
        headerImage: '',
        price: '',
        count: '',
        summaryPrice: '',
    }

    deleteItemFromBasket(slug) {
        this.props.deleteBasketItem(slug);
    };

    componentDidMount() {
        this.setState({
            slug: this.props.slug,
            title: this.props.title,
            headerImage: this.props.headerImage,
            price: this.props.price,
            count: this.props.count,
            summaryPrice: this.props.summaryPrice, 
        });
    };

    render() {

        const { slug,
                title,
                headerImage,
                price,
                count,
                summaryPrice, } = this.state;

        return (

            <tr className='basket-item'>
                <th scope='row' className='border-0 p-0 pt-2 pb-2 pr-3'>
                    <div className=''>
                        <div className='ml-3 d-inline-block align-middle'>
                            <ul className='list-group'>
                                <li className='list-group-item d-flex align-items-center category-item pl-0 pr-0'>
                                    <img src={ headerImage } className='mr-2' alt={ title } />
                                    <Link to={`/products/detail/${slug}/`}>{ title }</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </th>
                <td className='border-0 align-middle text-center'>{ price }</td>
                <td className='border-0 align-middle text-center'>{ count }</td>
                <td className='border-0 align-middle text-center'>{ summaryPrice }</td>
                <td className='border-0 align-middle text-center'>
                    <i 
                        onClick={ () => this.props.delete(slug) }
                        className='fa fa-trash'>
                    </i>
                </td>
            </tr>
        );
    };
};

export default BasketItem;