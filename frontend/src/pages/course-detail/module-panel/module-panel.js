import React, { Component, Fragment } from 'react';

import LessonsList from '../lessons-list';

import './module-panel.css';

class ModulePanel extends Component {

    state = {
        modules: this.props.modules,
        activeModule: this.props.activeModule,
        modulePanels: ''
    };

    activityCheck() {
        if (this.props.activeModule === this.props.id) {
            return true
        } else {
            return false
        };
    };

    getModulePanels() {
        const { modules } = this.state;
        this.setState({
            modulePanels: modules.map((module) => {
                return (
                    <div 
                        className={ this.props.activeModule === module.id ? 'tab-pane fade shadow rounded bg-white p-5 show active module-panel' : 'tab-pane fade shadow rounded bg-white p-5 module-panel' } key={ module.id } role='tabpanel' aria-labelledby='v-pills-home-tab'>
                        <h4 className='font-italic mb-4'>{ module.title }</h4>
                        <p className='mb-2'>{ module.description }</p>
                        <LessonsList lessons={ module.lesson } />
                    </div>
                )
            })
        });
    };

    componentDidUpdate(prevProps) {
        if (prevProps.activeModule !== this.props.activeModule) {
            this.getModulePanels();
        };
    };

    componentDidMount() {
        this.getModulePanels();
    };

    render() {

        const { modulePanels } = this.state;

        return (
            <Fragment>
                { modulePanels }
            </Fragment>
        );
    };
};

export default ModulePanel;