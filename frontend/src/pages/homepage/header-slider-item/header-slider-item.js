import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './header-slider-item.css';

class HeaderSliderItem extends Component {

    state = {
        slug: '',
        title: '',
        subtitle: '',
        image: '',
        type: ''
    };

    componentDidMount() {
        this.setState({
            slug: this.props.slug,
            title: this.props.title,
            subtitle: this.props.subtitle,
            image: this.props.image,
            type: this.props.type
        });
    };

    render() {

        const { slug, title, subtitle, image, type } = this.state;

        const toLink = () => {
            if (type === 'course') {
                return `/courses/${slug}/`
            } else if (type === 'webinar') {
                return `/webinars/${slug}/`
            } else {
                return `/workshops/${slug}/`
            }
        }

        return (
            <div 
                className='carousel-item header-slider-item align-items-center' 
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    backgroundBlendMode: 'color-dodge'
                }}
            >
                <div className='carousel-caption'>
                    <Link to={ toLink()  }><h3 className='display-4'>{ title }</h3></Link>
                    <p className='lead d-none d-md-block'>{ subtitle }</p>
                </div>
            </div>
        );
    };
};

export default HeaderSliderItem;
