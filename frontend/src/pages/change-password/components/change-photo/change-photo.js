import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import cosmetolog from '../../../../assets/cosmetolog.jpg';
import MedestetService from '../../../../service/medestet-service';
import { loadUser } from '../../../../actions/auth';
import './change-photo.css';

class ChangePhoto extends Component {

    state = {
        photo: this.props.photo,
        newImage: '',
        id: this.props.id,
        loading: '',
        success: '',
        error: ''
    };
    
    service = new MedestetService();

    handleImageChange(e) {
        this.setState({
            newImage: e.target.files[0],
            success: false,
            error: false
        });
    };

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ loading: true });

        const { newImage, id } = this.state;
        let formData = new FormData();
        formData.append('photo', newImage, newImage.name);
        const url = `${ this.service.API_BASE }/api/accounts/update/${ id }/`;
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

    componentDidUpdate(prevProps){
        if (this.props !== prevProps) {
            this.setState({
                photo: this.props.photo
            });
        };
    };

    render() {

        const { photo, loading, success, error } = this.state;

        return (
            <div className='col-md-4 change-user-photo mb-4 mt-3'>
                
                <form 
                    className='form-group mt-4 text-center'
                    onSubmit={ (e) => this.handleSubmit(e) }>
                    { loading ? 
                        <div className='spinner-border text-primary m-5' role='status'>
                            <span className='visually-hidden'></span>
                        </div>
                     : <img 
                        src={ photo ? photo : cosmetolog } 
                        alt='Medestet User' 
                        className='rounded-circle shadow-sm mt-5 mb-5' /> }
                    { success ? <div className='alert alert-success mt-4' role='alert'>
                    Ваше фото успішно змінено!
                    </div> : null }
                    { error ? <div className='alert alert-danger mt-4' role='alert'>
                    Сталася помилка. Будь-ласка, повторіть спробу знову або оберіть інший файл.
                    </div> : null }
                    {/* <label htmlFor='formFile' className='form-label'>Змінити фотографію профілю:</label> */}
                    <input 
                        className='form-control' 
                        type='file' 
                        id='formFile'
                        accept='image/png, image/jpeg, image/gif, image/jpg, image/tiff'
                        onChange={ (e) => this.handleImageChange(e) }
                        required
                    />
                    <button className='btn mt-3 mb-3' type='submit'>Завантажити</button>
                </form>
            </div>
        );
    };
};

const mapStateToProps = store => ({
    photo: store.authReducer.photo,
    id: store.authReducer.id,
})

export default connect(mapStateToProps, { loadUser })(ChangePhoto);