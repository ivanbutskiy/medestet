import React, { Component } from 'react';

import './product-image-slider.css';

class ProductImageSlider extends Component {

    render() {

        const { 
            headerImage,
            image1,
            image2,
            image3,
            image4,
            image5,
            image6
        } = this.props;

        return (
            <div id='carouselExampleIndicators' className='carousel carousel-product-images slide' data-ride='carousel'>
                <ol className='carousel-indicators'>
                    <li data-target='#carouselExampleIndicators' data-slide-to='0' className='active'></li>
                    { image1 ? <li data-target='#carouselExampleIndicators' data-slide-to='1'></li> : null }
                    { image2 ? <li data-target='#carouselExampleIndicators' data-slide-to='2'></li> : null }
                    { image3 ? <li data-target='#carouselExampleIndicators' data-slide-to='3'></li> : null }
                    { image4 ? <li data-target='#carouselExampleIndicators' data-slide-to='4'></li> : null }
                    { image5 ? <li data-target='#carouselExampleIndicators' data-slide-to='5'></li> : null }
                    { image6 ? <li data-target='#carouselExampleIndicators' data-slide-to='6'></li> : null }
                </ol>
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <img src={ headerImage } className='d-block w-100' alt={ headerImage } />
                    </div>
                    { image1 ? <div className='carousel-item'>
                        <img src={ image1 } className='d-block w-100' alt={ image1 } />
                    </div> : null }
                    { image2 ? <div className='carousel-item'>
                        <img src={ image2 } className='d-block w-100' alt={ image2 } />
                    </div> : null }
                    { image3 ? <div className='carousel-item'>
                        <img src={ image3 } className='d-block w-100' alt={ image3 } />
                    </div> : null }
                    { image4 ? <div className='carousel-item'>
                        <img src={ image4 } className='d-block w-100' alt={ image4 } />
                    </div> : null }
                    { image5 ? <div className='carousel-item'>
                        <img src={ image5 } className='d-block w-100' alt={ image5 } />
                    </div> : null }
                    { image6 ? <div className='carousel-item'>
                        <img src={ image6 } className='d-block w-100' alt={ image6 } />
                    </div> : null }
                </div>
                
                <a className='carousel-control-prev' href='#carouselExampleIndicators' role='button' data-slide='prev'>
                    <span aria-hidden='true'>
                        <i className='fas fa-chevron-left'></i>
                    </span>
                    <span className='sr-only'>Previous</span>
                </a>
                <a className='carousel-control-next' href='#carouselExampleIndicators' role='button' data-slide='next'>
                    <span aria-hidden='true'>
                        <i className='fas fa-chevron-right'></i>
                    </span>
                    <span className='sr-only'>Next</span>
                </a>
            </div>
        );
    };
};

export default ProductImageSlider;