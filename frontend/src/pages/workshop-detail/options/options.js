import React, { Component } from 'react';

import OptionItem from '../option-item';

import './options.css';

class Options extends Component {

    state = {
        options: '',
        optionItems: ''
    };

    getOptionItems() {
        const { options } = this.props;
        this.setState({
            optionItems: options.map((option) => {
                return <OptionItem 
                    key={ option.id }
                    title={ option.title }
                    description={ option.description }
                    price={ option.price }
                    old_price={ option.old_price }
                />
            })
        });
    };

    componentDidMount() {
        this.setState({ options: this.props.options });
        this.getOptionItems();
    };

    render() {

        const { optionItems } = this.state; 

        return (

            <div className='container options'>

                <h2>Выберите вариант участия</h2>

                <div className='row text-center align-items-center justify-content-center option-items pb-5 mt-5'>
                    { optionItems }
                </div>
            </div>

        );
    };
};

export default Options;