import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './webinar-item.css';

class WebinarItem extends Component {

    state = {
        title: this.props.title,
        image: this.props.image,
        slug: this.props.slug,
        subtitle: this.props.subtitle,
        endingDate: this.props.endingDate,
        daysLeft: this.props.daysLeft
    };

    render() {

        const { title, image, slug, subtitle, endingDate, daysLeft } = this.state;

        return (
            <div className='workshop-item card mb-3 shadow-sm'>
                <img src={ image } className='card-img-top' alt={ title } />
                <div className='card-body'>
                    { daysLeft > 0 ? <Link to={`/account/webinars/watch/${ slug }/`}>
                        <h4 className='card-title'>{ title }</h4>
                    </Link> : <h4 className='card-title text-muted'>{ title }</h4> }
                    <p className='card-text'>{ subtitle }</p>

                    { daysLeft > 0 ? <div className='card-detail-info mt-4'>
                        <div>
                            <p><i className='fas fa-calendar-week mr-2'></i>Доступ до записів до: { endingDate }</p>
                        </div>
                        <div>
                            <p><i className='fas fa-clock mr-2 mt-2'></i>Залишилося днів: { daysLeft }</p>
                        </div>
                        </div> : 
                        <div className='card-detail-info mt-4'>
                            <div>
                                <p className='text-muted'><i className='fas fa-clock mr-2'></i>Доступ до записів вебінару закінчився</p>
                            </div>
                        </div>
                    }

                </div>
            </div>
        );
    };
};

export default WebinarItem;
