import React, { Component } from 'react';

import './video-content.css';

class VideoContent extends Component {

    state = {
        title: '',
        text: '',
        video: ''
    };

    componentDidMount() {
        this.setState({ 
            text: this.props.text, 
            video: this.props.video,
            title: this.props.title
        });
    };

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({ 
                text: this.props.text, 
                video: this.props.video,
                title: this.props.title
            });
        };
    };

    render() {

        const { text, video, title } = this.state

        return (
            <div className='card blog-content shadow-sm container'>

                <div className='text-center video-content'>
                    <iframe title={ title } 
                        // width='560' 
                        // height='315' 
                        src={ video } 
                        frameBorder='0' 
                        allow='accelerometer; 
                        autoplay; 
                        clipboard-write; 
                        encrypted-media; 
                        gyroscope; 
                        picture-in-picture' 
                        allowfullScreen>
                    </iframe>
                </div>

                { text ? <div>
                    <hr className='mt-5 mb-5'></hr>
                    <p>{ text }</p>
                </div> : null }
            </div>
        );
    };
};

export default VideoContent;
