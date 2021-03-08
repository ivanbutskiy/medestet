import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './last-news-item.css';

export default class LastNewsItem extends Component {

    state = {
        image: '',
        title: '',
        slug: '',
        line: ''
    };

    componentDidMount() {
        this.setState({
            slug: this.props.slug,
            title: this.props.title,
            image: this.props.image,
            line: this.props.line
        });
    };

    render() {

        const { image, title, slug, line } = this.state;

        return (
            <div className='last-news-item'>
                <li className='list-group-item d-flex align-items-center'>
                    <img src={ image } className='mr-2' alt={ title } />
                    <Link to={`/news/${ slug }/`}><p>{ title }</p></Link>
                </li>
                { line ? <hr></hr> : null }
            </div>
        );
    };
};
