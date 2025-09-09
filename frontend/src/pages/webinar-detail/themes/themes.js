import React, { Component } from 'react';

import ThemeItem from '../theme-item';

import './themes.css';

class Themes extends Component {

    state = {
        themes: this.props.themes,
        themeItems: ''
    };

    getThemeItems() {
        try {
            this.setState({
                themeItems: this.state.themes.map((theme) => {
                    return <ThemeItem 
                        key={ theme.id }
                        title={ theme.title }
                        shortDescription={ theme.short_description }
                    />
                })
            })
        } catch {
            return null
        }
    };

    componentDidMount() {
        this.getThemeItems();
    };

    render() {

        const { themeItems } = this.state;

        return (
            <div className='webinar-themes container'>
                <h2>Теми вебінара</h2>

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