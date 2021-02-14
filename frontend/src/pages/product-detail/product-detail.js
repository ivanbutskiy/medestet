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
        priceCertifiedUAH: '',
        priceGuestUAH: '',
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
                        priceCertifiedUAH: parseFloat(product.data.price_certified_uah),
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
        const { slug, title, headerImage, priceCertifiedUAH, priceGuestUAH } = this.state;
        let count = 1;
        if (!isNaN(this.state.count)) {
            count = parseInt(this.state.count);
        };
        let price = 1
        if (this.props.isCertified && priceCertifiedUAH) {
            price = priceCertifiedUAH 
        } else {
            price = priceGuestUAH
        };
        
        this.props.addProductToBasket(slug, title, headerImage, price, count, priceCertifiedUAH, priceGuestUAH);
        this.makeActivePopup();
    };

    componentDidMount() {
        this.getProductDetail();
    };

    render() {

        const { loaded, error, count, modalActive } = this.state;
        const {
            brand,
            category,
            title,
            shortDescription,
            description,
            priceCertifiedUAH,
            priceGuestUAH,
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
                        <div className='col'>
                            <Spinner />
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <div className='product-page shadow-lg p-2'>
                { modalActive ? <ModalWindow 
                    active={ modalActive } 
                    activeHandler={ this.handlerPopupActive } /> : null }
                <HeaderProduct />
                <div className='container'>
                    <CategoryLink 
                        title={ category.title }
                        slug={ category.slug }
                    />
                    { this.props.isAuthenticated && !this.props.isCertified && !priceGuestUAH ? <div className='alert alert-danger product-need-certificate' role='alert'>Просмотр стоимости товара и возможность его заказа доступны только для сертифицированных косметологов. Если у вас есть сертификат, вы можете его прикрепить в личном кабинете, и после проверки вам будет доступна возможность просмотра стоимости и заказа всех товаров.</div> : null }
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
                            <p><strong>Краткое описание: </strong>{ shortDescription }</p>

                            { !priceGuestUAH && !this.props.isCertified && !this.props.isAuthenticated ? 
                            <Link to={{
                                pathname: /register/,
                                state: { fromProduct: true }
                            }}>
                                <button type='button' className='btn btn-danger mt-3 btn-block'>Узнать цену</button>
                            </Link> : null }

                            { this.props.isCertified ? <p title='Стоимость для сертифицированных косметологов'><i className='fas fa-user-check mr-2'></i>{ priceCertifiedUAH } грн.</p> : null }

                            { priceGuestUAH > 0 ? <p title='Стоимость для покупателей без сертификата косметолога'><i className='fas fa-tags mr-2'></i>{ priceGuestUAH } грн.</p> : null }
                            { this.props.isCertified || priceGuestUAH ? <form onSubmit={ (e) => this.addProductToBasket(e) }>
                                <div className='form-group'>
                                    <label htmlFor='product-count'><strong>Количество: </strong></label>
                                    <input 
                                        className='form-control' 
                                        id='product-count' 
                                        type='number' 
                                        min='1'
                                        max='100' 
                                        value={ count }
                                        placeholder={ count }
                                        onChange={ (e) => this.changeCount(e) }
                                        />
                                    <button type='submit' className='btn btn-danger mt-3 btn-block'>Добавить в корзину</button>
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