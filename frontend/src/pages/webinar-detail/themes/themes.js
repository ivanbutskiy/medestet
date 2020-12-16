import React, { Component } from 'react';

import ThemeItem from '../theme-item';

import './themes.css';

class Themes extends Component {

    state = {
        themes: this.props.themes,
        themeItems: ''
    };

    getThemeItems() {
        this.setState({
            themeItems: this.state.themes.map((theme) => {
                return <ThemeItem 
                    key={ theme.id }
                    title={ theme.title }
                    shortDescription={ theme.short_description }
                />
            })
        })
    };

    componentDidMount() {
        this.getThemeItems();
    };

    render() {

        const { themeItems } = this.state;

        return (
            <div className='workshop-lessons container'>
                <h2>Темы вебинара</h2>

                <div className='row'>
                    <div className='col-lg-7 mx-auto mb-5'>
                        
                        <ul className='timeline mt-5 mb-5'>

                            { themeItems }
                            
                        </ul>
                    </div>
                </div>
            </div>
        );
    };
};

export default Themes;