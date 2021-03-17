import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import './webinar-content.css';

class WebinarContent extends Component {

    state = {
        webinarContent: this.props.webinarContent
    };

    render() {

        const { webinarContent } = this.state;

        return (
            <div className='mt-5 webinar-content mb-5'>
                <div className='row align-items-center'>
                    <div className='col-md-7 webinar-content-description'>
                        { ReactHtmlParser(webinarContent.description) }
                    </div>
                    <div className='col-md-5'>
                        <img src={ webinarContent.description_image } alt='Вебинар Medestet' />
                    </div>
                </div>
                <hr></hr>

                { webinarContent.video ? 
                    <div className='mt-4'>
                        <h5>Ссылка на трансляцию:</h5>
                        <a target='_blank' rel='noreferrer' href={ webinarContent.video }>{ webinarContent.video }</a>
                    </div> : null }

                { webinarContent.video_record ? 
                    <div className='mt-4'>
                        <h5>Ссылка на запись вебинара:</h5>
                        <a target='_blank' rel='noreferrer' href={ webinarContent.video_record }>{ webinarContent.video_record }</a>
                    </div> : null }

            </div>
        );
    }
};

export default WebinarContent;
