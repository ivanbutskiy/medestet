import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderAccountPages from '../../components/header-account-pages';
import ReturnAccountPage from '../../components/return-account-page';
import NonAuth from '../non-auth';
import OrderItem from './order-item';
import ErrorBanner from '../../components/error-banner';
import MedestetService from '../../service/medestet-service';
import './user-shopping-list.css';
import Spinner from '../../components/spinner';

class UserShoppingList extends Component {

    state = {
        empty: false,
        loading: true,
        error: false,
        orderItems: ''
    };

    service = new MedestetService();

    getUserShoppingList() {
        this.service.getUserShoppingList()
            .then(result => {
                this.setState({ loading: false });
                if (result.data.count === 0) {
                    this.setState({ empty: true });
                } else {
                    this.setState({
                        orderItems: result.data.results.map(order => {
                            return (
                                <OrderItem 
                                    id={ order.id }
                                    key={ order.id }
                                    orderReference={ order.order_reference }
                                    orderSum={ order.order_sum }
                                    orderDate={ order.adding_date }
                                    products={ order.order_item } />
                            );
                        })
                    });
                };
            }).catch(error => {
                this.setState({ error: true, loading: false });
            });
    };

    componentDidMount() {
        this.getUserShoppingList();
        window.scrollTo(0, 0);
    };

    render() {

        const { orderItems, loading, empty, error } = this.state;

        if (!this.props.isAuthenticated) {
            return <NonAuth />
        };

        if (empty) {
            return (
                <div className='user-courses-list user-shopping-list shadow-lg p-2'>
                    <HeaderAccountPages title={ 'Мої покупки' } />
                    <ReturnAccountPage />
                    <div className='empty-courses-list text-center'>
                        <i className='fas fa-store text-primary fa-fw'></i>
                        <h4>На даний момент список ваших покупок поки що порожній</h4>
                        <p>Відвідайте наш магазин і виберіть для себе щось цікаве, {<Link to='/shop/'>розпочавши покупки</Link>}</p>
                    </div>
                </div>
            );
        };

        if (loading) {
            return (
                <div className='user-courses-list user-shopping-list shadow-lg p-2'>
                    <HeaderAccountPages title={ 'Мої покупки' } />
                    <ReturnAccountPage />
                    <div className='container mt-4'>
                        <div className='user-shopping-list-spinner'>
                            <Spinner />
                        </div>
                    </div>
                </div>
            );
        };

        if (error) {
            return (
                <div className='user-courses-list user-shopping-list shadow-lg p-2'>
                    <HeaderAccountPages title={ 'Мої покупки' } />
                    <ReturnAccountPage />
                    <div className='container user-shopping-list-error'>
                        <ErrorBanner />
                    </div>
                </div>
            );
        };

        return (
            <div className='user-courses-list user-shopping-list shadow-lg p-2'>
                <HeaderAccountPages title={ 'Мої покупки' } />
                <ReturnAccountPage />

                <div className='row mt-4'>
                    <div className='col-lg-10 mx-auto order-items'>
                        <div id='accordionExample' className='accordion shadow'>
                            { orderItems }
                        </div>
                    </div>
                </div>

            </div>
        );
    };
};

const mapStateToProps = store => ({
    isAuthenticated: store.authReducer.isAuthenticated
});

export default connect(mapStateToProps, null)(UserShoppingList);
