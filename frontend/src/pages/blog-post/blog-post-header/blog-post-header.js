import React, { Component } from 'react';

import './blog-post-header.css';

class BlogPostHeader extends Component {

    state = {
        image: '',
        title: '',
        addingDate: '',
        subtitle: ''
    }

    updateProps() {
        this.setState({
            image: this.props.image,
            title: this.props.title,
            addingDate: this.props.addingDate,
            subtitle: this.props.subtitle
        });
    };

    componentDidMount() {
        this.updateProps();
    };

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.updateProps();
        };
    };

    render() {

        const { title, image, addingDate, subtitle } = this.state;

        return (
            <div 
                className='row align-items-center blog-post-header shadow-sm card'
                style={{
                    backgroundImage: `url(${ image })`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    backgroundBlendMode: 'color-dodge'}}>
                <div className='col-md-10'>
                    <h1>{ title }</h1>
                    { subtitle ? <p className='mt-4'>{ subtitle }</p> : null }
                    <div className='row course-detail-info mt-4'>
                        <div className='col-md-6'>
                            <p><i className='fas fa-calendar-week mr-2'></i>Дата публикации: { addingDate }</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default BlogPostHeader;
