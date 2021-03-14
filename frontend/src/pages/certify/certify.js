import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderAccountPages from '../../components/header-account-pages';
import ReturnAccountPage from '../../components/return-account-page';
import MedestetService from '../../service/medestet-service';
import NonAuth from '../non-auth';
import { loadUser } from '../../actions/auth';
import CertifyForm from './certify-form';
import Certified from './certified';

import './certify.css';

class ChangeUserData extends Component {

    service = new MedestetService();

    onChangeHandler(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
            error: false,
            success: false
        });
    };

    onSubmitHandler(e) {
        e.preventDefault();
        this.setState({ success: false, error: false });
        const {
            id,
            email, 
            lastName, 
            firstName,
            patronym,
            phone } = this.state;
        
        this.service.updateUserData(
            id,
            email,
            lastName,
            firstName,
            patronym,
            phone
            )
        .then(res => {
            if (res.status === 200) {
                this.setState({ success: true })
                this.updateData(
                    res.data.email, 
                    res.data.last_name, 
                    res.data.first_name,
                    res.data.patronym
                );
                this.props.loadUser();
            } else {
                this.setState({ error: true })
            }
        }).catch(error => {
            this.setState({ error: true, success: false })
        });
    };

    componentDidMount() {
        window.scrollTo(0, 0);
    };

    render() {

        if (!this.props.isAuthenticated) {
            return <NonAuth />
        };

        return (
            <div className='change-user-data shadow-lg p-2'>
                <HeaderAccountPages title={ 'Сертификация аккаунта' } />
                <ReturnAccountPage />
                
                <div className='shadow-lg mt-3 certify'>

                { this.props.certificate ? <Certified 
                    certificate={ this.props.certificate }
                    isCertified={ this.props.isCertified }
                    email={ this.props.email }
                /> : <CertifyForm /> }

                </div>
            </div>
        );
    };
};

const mapStateToProps = store => ({
    id: store.authReducer.id,
    isAuthenticated: store.authReducer.isAuthenticated,
    email: store.authReducer.email,
    certificate: store.authReducer.certificate,
    isCertified: store.authReducer.isCertified,
})

export default connect(mapStateToProps, { loadUser })(ChangeUserData);