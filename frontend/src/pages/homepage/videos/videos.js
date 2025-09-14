import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Spinner from '../../../components/spinner';
import MedestetService from '../../../service/medestet-service';
import VideoItem from './video-item';
import './videos.css';

class Videos extends Component {
  state = { items: [], loading: true, error: null };
  service = new MedestetService();

  async componentDidMount() {
    try {
      const { data } = await this.service.lastVideos();
      this.setState({ items: data?.results || [], loading: false });
    } catch (e) {
      this.setState({ error: e, loading: false });
    }
  }

  getSliderSettings(count) {
    const show3 = Math.min(3, Math.max(count, 1));
    const show2 = Math.min(2, Math.max(count, 1));
    const show1 = 1;

    return {
      dots: count > 1,
      infinite: count > show3,
      speed: 500,
      slidesToShow: show3,
      slidesToScroll: 1,
      swipe: count > 1,
      cssEase: 'linear',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: show3,
            slidesToScroll: 1,
            dots: count > 1,
            infinite: count > show3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: show2,
            slidesToScroll: 1,
            dots: count > 1,
            infinite: count > show2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: show1,
            slidesToScroll: 1,
            dots: count > 1,
            infinite: false, // на очень узких — без бесконечного клонирования
          },
        },
      ],
    };
  }

  render() {
    const { items, loading, error } = this.state;

    if (loading) return <Spinner />;
    if (error) return <div className="alert alert-danger">Не удалось загрузить видео</div>;
    if (items.length === 0)
      return (
        <div className="videos card mt-4 pt-3 pb-4 shadow-sm">
          <h5>Останні відео</h5>
          <p className="text-muted mb-0">Поки що немає відео.</p>
        </div>
      );

    const settings = this.getSliderSettings(items.length);

    return (
      <div className="videos card mt-4 pt-3 pb-4 shadow-sm">
        <h5>Останні відео</h5>
        <Slider {...settings}>
          {items.map(v => (
            <VideoItem key={v.id} slug={v.slug} title={v.title} image={v.image} />
          ))}
        </Slider>
        <Link to="/video/">Перейти до всіх відео</Link>
      </div>
    );
  }
}

export default Videos;
