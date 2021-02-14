import React, { Component } from 'react';
import MedestetService from '../../../service/medestet-service';
import axios from 'axios';
import { loadUser } from '../../../actions/auth';
import { connect } from 'react-redux';

import './certify-form.css';

class CertifyForm extends Component {

    state = {
        certificate: '',
        id: '',
        error: false,
        success: false,
        loading: false,
        newCertificate: ''
    };

    service = new MedestetService();

    handleImageChange(e) {
        this.setState({
            newCertificate: e.target.files[0],
            error: false,
            success: false
        });
    };

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({ 
                certificate: this.props.certificate,
                id: this.props.id })
        };
    };

    componentDidMount() {
        this.setState({
            certificate: this.props.certificate,
            id: this.props.id
        });
    };

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ loading: true });

        const { newCertificate, id } = this.state;
        let formData = new FormData();
        formData.append('certificate', newCertificate, newCertificate.name);
        const url = `${ this.service.API_BASE }/api/accounts/update/${ id }/`;
        console.log(url)
        axios.patch(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }).then(res => {
            if (res.status === 200) {
                this.setState({ loading: false, success: true })
                this.props.loadUser();
            };
        }).catch(error => {
            this.setState({ error: true, loading: false })
        });
    };

    render() {

        const { 
            certificate, 
            error, 
            success, 
            loading } = this.state;

        return (
            <div className='certify-form py-5'>

                { success ? <div className='alert alert-success ml-5 mr-5' role='alert'>
                Ваш сертификат успешно загружен! После того, как наши модераторы его проверят, мы отправим сообщение на вашу почту { this.props.email }.
                </div> : null }
                { error ? <div className='alert alert-danger ml-5 mr-5' role='alert'>
                Произошла ошибка загрузки сертификата. Пожалуйста, повторите попытку. Если возникли трудности, свяжитесь с нами.
                </div> : null }

                <header className='text-white text-center'>
                    <p className='lead'>Загрузите свой сертификат косметолога, чтобы иметь возможность заказывать любые товары в нашем интернет-магазине и пользоваться всеми преимуществами, которые недоступны обычным пользователям.</p>
                    { loading ? <div className='spinner-border text-primary m-5' role='status'>
                            <span className='visually-hidden'></span>
                        </div> : <img src={ certificate ? certificate : 'https://res.cloudinary.com/mhmd/image/upload/v1564991372/image_pxlho1.svg' } alt='' width='250' className='mb-4 mt-4' />}
                </header>

                <div className='row py-4'>
                    <div className='col-lg-6 mx-auto'>

                        <form 
                            className='input-group'
                            onSubmit={ (e) => this.handleSubmit(e) }>

                        <div className='custom-file'>
                            <input 
                                type='file' 
                                className='custom-file-input' 
                                id='customFile'
                                accept='image/png, image/jpeg, image/gif, image/jpg, image/tiff'
                                onChange={ (e) => this.handleImageChange(e) }
                                required
                            />
                            <label 
                                className='custom-file-label mr-5 ml-5' 
                                for='customFile'>Нажмите, чтобы выбрать картинку сертификата
                            </label>
                        </div>

                            <button className='btn mt-3 mb-3 mt-5 mr-5 ml-5' type='submit'>Загрузить сертификат</button>
                        </form>

                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = store => ({
    certificate: store.authReducer.certificate,
    id: store.authReducer.id,
    email: store.authReducer.email,
})

export default connect(mapStateToProps, {loadUser})(CertifyForm);