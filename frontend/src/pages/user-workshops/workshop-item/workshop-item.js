import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './workshop-item.css';

class WorkshopItem extends Component {

    state = {
        date: this.props.date,
        slug: this.props.slug,
        workshopTitle: this.props.workshopTitle,
        status: this.props.status,
        orderDate: this.props.orderDate
    };

    render() {

        const { date, workshopTitle, status, orderDate, slug } = this.state;

        return (
            <div className='card user-workshop-item'>
                <div className='card-header'>
                    <strong>Дата и время начала:</strong> { date }
                </div>
                <div className='card-body'>
                    <h4><Link to={`/workshops/${slug}/`}>{ workshopTitle }</Link></h4> 
                    <p className='mt-3'><strong>Дата оформления заявки на участие: </strong>{ orderDate }.</p>
                    <p><strong>Статус: </strong>{ status === 'paid' ? 'оплачено.' : 'ожидается оплата.' }</p>
                </div>
            </div>
        );
    };
};

export default WorkshopItem;