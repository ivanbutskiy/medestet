import React, { Component } from 'react';

import ModulePill from '../module-pill';
import ModulePanel from '../module-panel';

import './program.css';

class Program extends Component {

    state = {
        modules: this.props.modules,
        activeModule: this.props.modules[0].id
    };

    moduleActiveHandler = id => {
        this.setState({activeModule: id});
    };

    render() {

        const { modules, activeModule } = this.state;

        return (

            <div className='program container'>

                <h2>Программа</h2>

                <div className='row mt-5 mb-5'>

                    <div className='col-md-3'>
                        <div className='nav flex-column nav-pills nav-pills-custom' id='v-pills-tab' role='tablist' aria-orientation='vertical'>
                            <ModulePill 
                                modules={ modules }
                                activeModule={ activeModule }
                                moduleActiveHandler={ this.moduleActiveHandler }
                            />
                        </div>
                    </div>


                    <div className='col-md-9'>
                        <div className='tab-content' id='v-pills-tabContent'>
                            <ModulePanel 
                                modules={ modules }
                                activeModule={ activeModule } 
                            />
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    };
};

export default Program;