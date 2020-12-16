import React, { Component } from 'react';

import PersonItem from '../person-item/';

import './persons.css';

class Persons extends Component {

    state = {
        personItems: null,
        persons: []
    };

    getPersonItems() {
        this.setState({
            personItems: this.props.persons.map((person) => {
                return <PersonItem 
                    key={ person.id } 
                    personTitle={ person.person }
                    imagePerson={ person.image_person }
                    personDetail={ person.person_detail } />
            })
        })
    }

    componentDidMount() {
        this.getPersonItems();
    };

    render() {

        const { personItems } = this.state;

        return (
            <div className='persons rounded bg-gradient-2 text-white shadow p-5 text-center'>
                <h2 className='persons-header'>Этот курс предназначен</h2>
                <div className='row align-items-center justify-content-center mt-5'>
                    { personItems }
                </div>
            </div>
        );
    };
};

export default Persons;