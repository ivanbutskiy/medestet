import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './product-item.css';

class ProductItem extends Component {

    state = {
        headerImage: '',
        count: '',
        price: '',
        summaryPrice: '',
        title: '',
        slug: ''
    };

    componentDidMount() {
        this.setState({
            headerImage: this.props.headerImage,
            title: this.props.title,
            count: this.props.count,
            summaryPrice: this.props.summaryPrice,
            price: this.props.price,
            slug: this.props.slug
        });
    };

    render() {

        const { 
            headerImage,
            count,
            price,
            summaryPrice,
            title,
            slug
         } = this.state;

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
            </tr>
        );
    };
};

export default ProductItem;
