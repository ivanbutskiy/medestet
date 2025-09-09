import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';

import HeaderProduct from './header-product';
import MedestetService from '../../service/medestet-service';
import Spinner from '../../components/spinner';
import ProductImageSlider from './product-image-slider';
import CategoryLink from './category-link';
import ModalWindow from './modal-window';
import ErrorBanner from '../../components/error-banner'

import { addProductToBasket } from '../../actions/basket';

import './product-detail.css';

class ProductDetail extends Component {

    service = new MedestetService();

    state = {
        id: '',
        slug: '',
        brand: '',
        category: '',
        title: '',
        shortDescription: '',
        description: '',
        volume: '',
        priceCertifiedUAH: '',
        newPriceCertifiedUAH: '',
        priceGuestUAH: '',
        newPriceGuestUAH: '',
        headerImage: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        image5: '',
        image6: '',

        error: false,
        loaded: false,
        count: 1,
        modalActive: false
    };

    handlerPopupActive = () => {
        if (this.state.modalActive === false) {
            this.setState({
                modalActive: true
            });
        } else if (this.state.modalActive === true) {
            this.setState({
                modalActive: false
            })
        };
    };

    makeActivePopup() {
        this.setState({
            modalActive: true
        });
    };

    getProductDetail() {
        this.service.getProductDetail(this.props.slug)
            .then(product => {
                if (product.status !== 200) {
                    this.setState({ error: true });
                } else {
                    this.setState({
                        id: product.data.id,
                        slug: product.data.slug,
                        brand: product.data.brand,
                        category: product.data.category,
                        title: product.data.title,
                        shortDescription: product.data.short_description,
                        description: product.data.description,
                        volume: parseInt(product.data.volume),
                        priceCertifiedUAH: parseFloat(product.data.price_certified_uah),
                        newPriceCertifiedUAH: parseFloat(product.data.new_price_certified_uah),
                        newPriceGuestUAH: parseFloat(product.data.new_price_guest_uah),
                        priceGuestUAH: parseFloat(product.data.price_guest_uah),
                        headerImage: product.data.header_image,
                        image1: product.data.image_1,
                        image2: product.data.image_2,
                        image3: product.data.image_3,
                        image4: product.data.image_4,
                        image5: product.data.image_5,
                        image6: product.data.image_6,

                        loaded: true
                    })
                };
            })
            .catch(error => {
                this.setState({ error: true });
            });
    };

    changeCount(e) {
        this.setState({count: e.target.value});
    };

    addProductToBasket(e) {
        e.preventDefault();
        const { 
            id,
            slug, 
            title, 
            headerImage, 
            priceCertifiedUAH, 
            priceGuestUAH,
            newPriceCertifiedUAH,
            newPriceGuestUAH,
             } = this.state;

        let count;
        if (isNaN(parseInt(this.state.count))) {
            count = 1;
        } else {
            count = this.state.count;
        };

        let price;

        if (this.props.isCertified) {
            if (newPriceCertifiedUAH > 0) {
                price = newPriceCertifiedUAH;
            } else {
                price = priceCertifiedUAH;
            };
        } else {
            if (newPriceGuestUAH) {
                price = newPriceGuestUAH;
            } else {
                price = priceGuestUAH;
            };
        };
        
        this.props.addProductToBasket(id, slug, title, headerImage, price, count, priceCertifiedUAH, priceGuestUAH);
        this.makeActivePopup();
    };

    componentDidMount() {
        this.getProductDetail();
        window.scrollTo(0, 0);
    };

    render() {

        const { loaded, error, count, modalActive } = this.state;
        const {
            brand,
            category,
            title,
            shortDescription,
            description,
            volume,
            priceCertifiedUAH,
            newPriceCertifiedUAH,
            priceGuestUAH,
            newPriceGuestUAH,
            headerImage,
            image1,
            image2,
            image3,
            image4,
            image5,
            image6,
            } = this.state;

        if (error) {
            return (
                <div className='product-page shadow-lg'>
                    <div className='row justify-content-center error-banner'>
                        <div className='col'>
                            <ErrorBanner />
                        </div>
                    </div>
                </div>
            );
        };

        if (!loaded) {
            return (
                <div className='product-page shadow-lg p-2'>
                    <HeaderProduct />
                    <div className='row justify-content-center product-page-spinner'>
                        <Spinner />
                    </div>
                </div>
            );
        };

        const getTotalCost = () => {
            let totalCost;
            if (this.props.isCertified) {
                if (newPriceCertifiedUAH > 0) {
                    totalCost = newPriceCertifiedUAH;
                } else {
                    totalCost = priceCertifiedUAH;
                };
            } else {
                if (newPriceGuestUAH > 0) {
                    totalCost = newPriceGuestUAH;
                } else {
                    totalCost = priceGuestUAH;
                };
            };
            return totalCost;
        };

        return (
            <div className='product-page shadow-lg p-2'>
                { modalActive ? <ModalWindow 
                    active={ modalActive } 
                    activeHandler={ this.handlerPopupActive } /> : null }
                <HeaderProduct />
                <CategoryLink 
                    title={ category.title }
                    slug={ category.slug }
                />
                { this.props.isAuthenticated && !this.props.isCertified && !priceGuestUAH ? <div className='alert alert-danger product-need-certificate' role='alert'>Просмотр стоимости товара и возможность его заказа доступны только для сертифицированных косметологов. Если у вас есть сертификат, вы можете его прикрепить в личном кабинете, и после проверки вам будет доступна возможность просмотра стоимости и заказа всех товаров.</div> : null }

                { !this.props.isAuthenticated && !priceGuestUAH ? <div className='alert alert-danger product-need-certificate' role='alert'>Просмотр стоимости товара и возможность его заказа доступны только для сертифицированных косметологов. Если у вас есть сертификат, вы можете зарегистрироваться на сайте, прикрепить его в личном кабинете, и после проверки вам будет доступна возможность просмотра стоимости и заказа всех товаров.</div> : null }
                <div className='container'>

                    <div className='row justify-content-center product-detail-content align-items-center'>
                        <div className='col-sm-12 col-md-6 mt-5'>
                            <ProductImageSlider
                                headerImage={ headerImage }
                                image1={ image1 }
                                image2={ image2 }
                                image3={ image3 }
                                image4={ image4 }
                                image5={ image5 }
                                image6={ image6 }
                                />
                        </div>
                        <div className='col-sm-12 col-md-6 mt-5'>
                            { brand.brand_image ? <img className='brand-logo' src={ brand.brand_image } alt={ brand.brand_image } /> : null }
                            <h2 className='mt-3'>{ title }</h2>
                            <hr></hr>
                            <p><strong>Производитель: </strong>{ brand.title }</p>
                            <p><strong>Страна: </strong>{ brand.country }</p>
                            <p><strong>Категория: </strong>{ category.title }</p>
                            { volume ? <p><strong>Объем: </strong>{ volume } мл.</p> : null }
                            <p><strong>Краткое описание: </strong>{ shortDescription }</p>

                            { !priceGuestUAH && !this.props.isCertified && !this.props.isAuthenticated ? 
                            <Link to={{
                                pathname: /register/,
                                state: { fromProduct: true }
                            }}>
                                <button type='button' className='btn btn-danger mt-3 btn-block'>Узнать цену</button>
                            </Link> : null }

                            { this.props.isCertified && !newPriceCertifiedUAH > 0 && (priceCertifiedUAH !== priceGuestUAH) ? 
                                <div className='row text-center'>
                                    <div className='col-6'>
                                        <p title='Стоимость для сертифицированных косметологов'><i className='fas fa-user-check mr-2'></i>{ priceCertifiedUAH } грн.</p>
                                    </div>
                                    <div className='col-6'></div>
                                </div>
                             : null }

                            { this.props.isCertified && newPriceCertifiedUAH > 0 ? 
                            <div className='row text-center'>
                                <div className='col-6'>
                                    <p title='Стоимость без акции для сертифицированных косметологов' style={{ textDecoration: 'line-through' }}><i className='fas fa-user-check mr-2'></i>{ priceCertifiedUAH } грн.</p>
                                </div>
                                <div className='col-6'>
                                    <p title='Акционная стоимость для сертифицированных косметологов'><i className='fas fa-user-check mr-2' style={{color: '#cc0000'}}></i>{ newPriceCertifiedUAH } грн.</p>
                                </div>
                            </div>
                             : null }

                            { priceGuestUAH > 0 && !newPriceGuestUAH > 0 ? 
                                <div className='row text-center'>
                                    <div className='col-6'>
                                        <p title='Стоимость для покупателей без сертификата косметолога'>
                                        <i className='fas fa-tags mr-2'></i>{ priceGuestUAH } грн.</p>
                                    </div>
                                    <div className='col-6'></div>
                                </div>
                             : null }

                            { newPriceGuestUAH > 0 ? 
                            <div className='row text-center'>
                                <div className='col-6'>
                                    <p title='Стоимость без акции для покупателей без сертификата косметолога' style={{ textDecoration: 'line-through' }}><i className='fas fa-tags mr-2'></i>{ priceGuestUAH } грн.</p>
                                </div>
                                <div className='col-6'>
                                    <p title='Акционная стоимость для покупателей без сертификата косметолога'><i className='fas fa-tags mr-2' style={{color: '#cc0000'}}></i>{ newPriceGuestUAH } грн.</p>
                                </div>
                            </div>
                             : null }

                            { this.props.isCertified && (newPriceGuestUAH || newPriceCertifiedUAH) ? <p><strong>Ваша стоимость: </strong>{ getTotalCost() } грн.</p> : null }

                            { !this.props.isCertified && newPriceGuestUAH > 0 ? <p><strong>Ваша стоимость: </strong>{ getTotalCost() } грн.</p> : null }

                            { this.props.isCertified || priceGuestUAH > 0 || newPriceGuestUAH ? <form onSubmit={ (e) => this.addProductToBasket(e) }>
                                <div className='form-group'>
                                    <label htmlFor='product-count'><strong>Количество: </strong></label>
                                    <input 
                                        className='form-control' 
                                        id='product-count' 
                                        type='number' 
                                        min='1'
                                        max='1000' 
                                        value={ count }
                                        placeholder={ count }
                                        onChange={ (e) => this.changeCount(e) }
                                        />
                                    <button type='submit' className='btn mt-3 btn-primary btn-block add-to-basket-button'><i className='fa fa-trash mr-2'></i>Додати в кошик</button>
                                </div>
                            </form> : null }
                        </div>
                    </div>
                    <div className='product-detail-description'>
                        <p><strong>Детальное описание:</strong></p>
                        { ReactHtmlParser(description) }
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = store => ({
    isCertified: store.authReducer.isCertified,
    isAuthenticated: store.authReducer.isAuthenticated
});

export default connect(mapStateToProps, { addProductToBasket })(ProductDetail);