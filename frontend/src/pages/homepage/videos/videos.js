import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Spinner from '../../../components/spinner';

import MedestetService from '../../../service/medestet-service';

import './videos.css';
import VideoItem from './video-item';

class Videos extends Component {

    state = {
        videoItems: '',
        loading: true
    };

    service = new MedestetService();

    getLastVideos() {
        this.service.lastVideos()
            .then(result => {
                if (result.data.count > 0) {
                    this.setState({
                        videoItems: result.data.results.map(video => {
                            return (
                                <VideoItem 
                                    key={ video.id }
                                    slug={ video.slug }
                                    title={ video.title }
                                    image={ video.image }
                                />
                            );
                        })
                    })
                }
            })
            this.setState({ loading: false })
    };

    componentDidMount() {
        this.getLastVideos();
    };

    render() {

        const { videoItems, loading } = this.state;

        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            swipe: true,
            slidesToScroll: 1,
            cssEase: 'linear',
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
        }

        return (
            <div className='videos card mt-4 pt-3 pb-4 shadow-sm'>
                <h5>Последние видео</h5>

                { loading ? <Spinner /> : 
                <Slider {...settings}>
                    { videoItems }
                </Slider>
                }
                <Link to='/video/'>Перейти ко всем видео</Link>
            </div>
        );
    };
};

export default Videos;
