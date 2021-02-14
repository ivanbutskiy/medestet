import React, { Component, Fragment } from 'react';

import './module-pill.css';

class ModulePill extends Component {

    state = {
        modules: this.props.modules,
        modulePills: ''
    };

    getModulesPills() {
        this.setState({
            modulePills: this.props.modules.map((module) => {
                return (
                    <a 
                        className={ this.props.activeModule === module.id ? 'nav-link mb-3 p-3 shadow active module-pill' : 'nav-link mb-3 p-3 shadow module-pill'}
                        key={ module.id }
                        id={ module.id } 
                        data-toggle='pill' 
                        href={`#${module.id}`} 
                        role='tab' 
                        aria-controls='v-pills-home' 
                        aria-selected='false'
                        onClick={ () => this.props.moduleActiveHandler(module.id) }>
                        
                        <span>{ module.title }</span>
                    </a>
                )
            })
        });
    };

    componentDidUpdate(prevProps) {
        if (prevProps.activeModule !== this.props.activeModule) {
            this.getModulesPills();
        };
    };

    componentDidMount() {
        this.getModulesPills();
    };

    render() {

        const { modulePills } = this.state;

        return (
            <Fragment>
                { modulePills }
            </Fragment>
        );
    };
};

export default ModulePill;