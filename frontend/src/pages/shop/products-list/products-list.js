import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ProductCard from '../product-card';
import MedestetService from '../../../service/medestet-service';
import ErrorBanner from '../../../components/error-banner';
import Spinner from '../../../components/spinner';
import Paginator from '../paginator';

import './products-list.css';

class ProductsList extends Component {

    service = new MedestetService();

    state = {
        productCards: '',
        loading: true,
        error: false,
        count: '',
        previousPage: '',
        nextPage: ''
    };


    getAllProducts() {
        this.service.getAllProducts(this.props.match.params.page)
            .then((products) => {
                if (products.data.count !== 0) {
                    this.setState({
                        productCards: products.data.results.map((product) => {
                            return <ProductCard 
                                key={ product.slug }
                                slug={ product.slug }
                                title={ product.title }
                                priceCertifiedUAH={ product.price_certified_uah }
                                priceGuestUAH={ product.price_guest_uah }
                                newPriceCertifiedUAH={ product.new_price_certified_uah }
                                newPriceGuestUAH={ product.new_price_guest_uah }
                                headerImage={ product.header_image }
                                image1={ product.image_1 }
                            />
                        })
                    })
                    this.setState({ count: products.data.count })
                    this.setState({ error: false })
                    this.setState({ previousPage: products.data.previous })
                    this.setState({ nextPage: products.data.next })
                } else {
                    this.setState({ count: 0 })
                };
                this.setState({ loading: false })
            })
            .catch(error => {
                this.setState({ error: true })
            })
    };

    getProductsByCategory() {
        this.service.getProductsByCategory(this.props.match.params.slug, this.props.match.params.page)
        .then((products) => {
            if (products.data.count !== 0) {
                this.setState({
                    productCards: products.data.results.map((product) => {
                        return <ProductCard 
                            key={ product.slug }
                            slug={ product.slug }
                            title={ product.title }
                            priceCertifiedUAH={ product.price_certified_uah }
                            priceGuestUAH={ product.price_guest_uah }
                            newPriceCertifiedUAH={ product.new_price_certified_uah }
                            newPriceGuestUAH={ product.new_price_guest_uah }
                            headerImage={ product.header_image }
                            image1={ product.image_1 }
                        />
                    })
                })
                this.setState({ count: products.data.count })
                this.setState({ error: false })
                this.setState({ previousPage: products.data.previous })
                this.setState({ nextPage: products.data.next })
            } else {
                this.setState({ count: 0 })
            };
            this.setState({ loading: false })
        })
        .catch(error => {
            this.setState({ error: true })
        })
    };

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            if (!this.props.match.params.slug) {
                this.setState({loading: true});
                this.getAllProducts();
            } else {
                this.setState({loading: true});
                this.getProductsByCategory();
            };
        };
    };

    componentDidMount() {
        if (this.props.match.params.slug) {
            this.getProductsByCategory();
        } else {
            this.getAllProducts();
        };
    };

    render() {

        const { productCards, 
                error, 
                loading, 
                count, 
                previousPage, 
                nextPage, 
                 } = this.state;

        if (count === 0) {
            return (
                <div className='card shadow-sm pt-3 pb-3 product-list'>
                    <div className='container empty-product-list text-center'>
                        <h2>У цій категорії поки що немає товарів</h2>
                    </div>
                </div>
            );
        };

        if (error) {
            return (
                <div className='card shadow-sm pt-3 pb-3 product-list'>
                    <div className='container'>
                        <ErrorBanner />
                    </div>
                </div>
            )
        };

        if (loading) {
            return (
                <div className='card shadow-sm pt-3 pb-3 product-list'>
                    <Spinner />
                </div>
            );
        };

        return (
            <div className='card shadow-sm pt-3 pb-3 product-list'>
                <div className='container'>
                    <div className='row'>
                        { productCards }
                    </div>
                    { count > 30 ? <Paginator 
                        previousPage={ previousPage }
                        nextPage={ nextPage }
                        count={ count }
                    /> : null }
                </div>
            </div>
        );
    };
};

export default withRouter(ProductsList);
