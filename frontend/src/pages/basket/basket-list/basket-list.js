import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteFromBasket, clearBasket } from '../../../actions/basket';

import BasketItem from '../basket-item';

import './basket-list.css';

class BasketList extends Component {

    constructor(props){
        super(props);
        this.state = {
            basketList: null,
            sum: null
        };
    };

    getBasketList() {
        this.setState({
            basketList: this.props.basketList.map((item) => {
                return <BasketItem 
                    key={item.slug}
                    slug={item.slug}
                    title={item.title}
                    price={item.price}
                    headerImage={item.headerImage}
                    count={item.count}
                    summaryPrice={item.summaryPrice}
                    delete={ () => this.deleteBasketItem(item.slug) }
                />
            })
        });
    };

    deleteBasketItem = (slug) => {
        this.props.deleteFromBasket(slug);
        this.getBasketList();
    };

    componentDidUpdate(prevProps) {
        if (this.props.basketList !== prevProps.basketList) {
            this.getBasketList();
        };
    };

    componentDidMount() {
        this.getBasketList();
    };

    render () {

        const { basketList } = this.state;

        return (
            <div className='basket-list'>
                <div className='container'>
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
                                                <div className='py-2'>Стоимость</div>
                                            </th>
                                            <th scope='col' className='border-0'>
                                                <div className='py-2'>Количество</div>
                                            </th>
                                            <th scope='col' className='border-0'>
                                                <div className='py-2'>Сумма</div>
                                            </th>
                                            <th scope='col' className='border-0'>
                                                <div className='py-2'>Удалить</div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { basketList }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = store => ({
    basketList: store.basketReducer.basketList,
    count: store.basketReducer.count
})


export default connect(mapStateToProps, { deleteFromBasket, clearBasket })(BasketList);