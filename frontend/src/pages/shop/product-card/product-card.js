import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './product-card.css';

class ProductCard extends Component {

    state = {
        slug: this.props.slug,
        title: this.props.title,
        priceCertifiedUAH: parseFloat(this.props.priceCertifiedUAH),
        priceGuestUAH: parseFloat(this.props.priceGuestUAH),
        newPriceCertifiedUAH: parseFloat(this.props.newPriceCertifiedUAH),
        newPriceGuestUAH: parseFloat(this.props.newPriceGuestUAH),
        headerImage: this.props.headerImage,
        image1: this.props.image1
    }

    render() {

        const { 
            slug, 
            title, 
            priceCertifiedUAH, 
            priceGuestUAH,
            newPriceCertifiedUAH,
            newPriceGuestUAH,
            headerImage, 
            image1 } = this.state;

        console.log(priceCertifiedUAH === priceGuestUAH);

        return (

            <div className='col-md-6 col-sm-6 col-lg-4 mt-3'>
                <div className='card text-center product-grid3 h-100'>
                    <div className='product-image3'>
                        <Link to={ `/products/detail/${slug}/` }>
                            <img className='pic-1' src={ headerImage } alt={ title } />
                            <img className='pic-2' src={image1 ? image1 : headerImage } alt={ title } />
                        </Link>
                    </div>
                    <div className='card-body product-content'>
                        <Link to={ `/products/detail/${slug}/` }>
                            <p className='card-title'>{ title }</p>
                        </Link>
                    </div>
                    <div className='price'>
                        <div className='price-list text-left'>

                            { this.props.isCertified && newPriceCertifiedUAH > 0 ? <div className='price mr-3' title='Акционная стоимость для сертифицированных косметологов'><i className='fas fa-user-check mr-2' style={{color: '#cc0000'}}></i>{ newPriceCertifiedUAH } грн.</div> : null }

                            { this.props.isCertified && !newPriceCertifiedUAH > 0 && (priceCertifiedUAH !== priceGuestUAH) ? <div className='price mr-3' title='Стоимость для сертифицированных косметологов'><i className='fas fa-user-check mr-2'></i>{ priceCertifiedUAH } грн.</div> : null }

                            { priceGuestUAH > 0 && newPriceGuestUAH > 0 ? <div className='price mr-3' title='Акционная стоимость для покупателей без сертификата косметолога'><i className='fas fa-tags mr-2' style={{color: '#cc0000'}}></i>{ newPriceGuestUAH } грн.</div> : null }

                            { priceGuestUAH > 0 && !newPriceGuestUAH > 0 ? <div className='price mr-3' title='Стоимость для покупателей без сертификата косметолога'><i className='fas fa-tags mr-2'></i>{ priceGuestUAH } грн.</div> : null }
                            
                        </div>
                    </div>
                </div>
            </div>

        );
    };
};

const mapStateToProps = (store) => ({
    isCertified: store.authReducer.isCertified
});

export default connect(mapStateToProps, null)(ProductCard);