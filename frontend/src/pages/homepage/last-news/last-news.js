import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MedestetService from '../../../service/medestet-service';
import LastNewsItem from './last-news-item';
import './last-news.css';

export default class LastNews extends Component {

    state = {
        lastNewsItems: ''
    };

    service = new MedestetService();

    getLastNews() {
        this.service.lastNews()
            .then(result => {
                if (result.data.count > 0) {
                    let counter = 0;
                    this.setState({
                        lastNewsItems: result.data.results.map(news => {
                            ++counter
                            return (
                                <LastNewsItem 
                                    key={ news.id }
                                    slug={ news.slug }
                                    title={ news.title }
                                    image={ news.image }
                                    line={ counter === result.data.count ? false : true }
                                />
                            )
                        })
                    });
                }
            })
    };

    componentDidMount() {
        this.getLastNews();
    };

    render() {

        const { lastNewsItems } = this.state;

        return (
            <div className='col-md-6 last-news mt-4'>
                <div className='card shadow-sm pb-3 h-100'>
                    <h5>Свіжі новини</h5>
                    { lastNewsItems }
                    <div className='text-center'>
                        <Link to='/news/' className='link text-center'>Перейти до всіх новин</Link>
                    </div>
                </div>
            </div>
        );
    };
};
