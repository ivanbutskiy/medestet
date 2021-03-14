import React, { Component } from 'react';
import MedestetService from '../../../service/medestet-service';
import HeaderSliderItem from '../header-slider-item';
import logoMedestet from '../../../assets/logo_medestet.png';

import './header-slider.css'

export default class HeaderSlider extends Component {

    state = {
        lastCoursesList: '',
        lastWebinarsList: '',
        lastWorkshopsList: ''
    }

    serice = new MedestetService();

    getLastCourses() {
        this.serice.lastCourses()
            .then(result => {
                if (result.data.count > 0) {
                    this.setState({
                        lastCoursesList: result.data.results.map(course => {
                            return (
                                <HeaderSliderItem 
                                key={ course.id }
                                slug={ course.slug }
                                title={ course.title }
                                subtitle={ course.subtitle }
                                image={ course.header_image }
                                type='course'
                            />
                        );
                    })
                })
            }
        })
    };

    getLastWebinars() {
        this.serice.lastWebinars()
            .then(result => {
                if (result.data.count > 0) {
                    this.setState({
                        lastWebinarsList: result.data.results.map(webinar => {
                            return (
                                <HeaderSliderItem
                                key={ webinar.id } 
                                slug={ webinar.slug }
                                title={ webinar.title }
                                subtitle={ webinar.subtitle }
                                image={ webinar.header_image }
                                type='webinar'
                            />
                        );
                    })
                })
            }
        })
    };

    getLastWorkshops() {
        this.serice.lastWorkshops()
            .then(result => {
                if (result.data.count > 0) {
                    this.setState({
                        lastWorkshopsList: result.data.results.map(workshop => {
                            return (
                                <HeaderSliderItem 
                                key={ workshop.id }
                                slug={ workshop.slug }
                                title={ workshop.title }
                                subtitle={ workshop.subtitle }
                                image={ workshop.header_image }
                                type='workshop'
                            />
                        );
                    })
                })
            }
        })
    };

    componentDidMount() {
        this.getLastCourses();
        this.getLastWebinars();
        this.getLastWorkshops();
    };

    render() {

        const { lastCoursesList, lastWebinarsList, lastWorkshopsList } = this.state;

        return (
            <header className='homepage-header shadow-sm card'>
                <div id='carouselExampleIndicators' className='carousel slide' data-ride='carousel'>

                    <div className='carousel-inner' role='listbox'>
                    
                        <div className='carousel-item active header-medestet'>
                            <div className='carousel-caption'>
                                <img src={ logoMedestet } alt='MedEstet Logo' />
                                <h3 className='display-4'>Компания MedEstet-Pro</h3>
                                <p className='lead'>Вместе с вами мы делаем мир прекраснее</p>
                            </div>
                        </div>

                        { lastCoursesList ? lastCoursesList : null }
                        { lastWebinarsList ? lastWebinarsList : null }
                        { lastWorkshopsList ? lastWorkshopsList : null }

                    </div>
                    
                    {/* <a className='carousel-control-prev' href='#carouselExampleIndicators' role='button' data-slide='prev'>
                        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                        <span className='sr-only'>Previous</span>
                    </a>
                    <a className='carousel-control-next' href='#carouselExampleIndicators' role='button' data-slide='next'>
                        <span className='carousel-control-next-icon' aria-hidden='true'></span>
                        <span className='sr-only'>Next</span>
                    </a> */}
                </div>
            </header>
        );
    };
};