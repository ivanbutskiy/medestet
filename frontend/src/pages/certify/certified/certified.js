import React, { Component } from 'react';

import './certified.css';

class Certified extends Component {

    state = {
        certificate: this.props.certificate,
        isCertified: this.props.isCertified,
        email: this.props.email
    };

    render() {

        const { 
            certificate,
            isCertified,
            email
            } = this.state;

        return (
            <div className='certify-form py-5'>

                <header className='text-white text-center'>
                    { certificate && !isCertified ? <p className='lead'>Ваш сертифікат знаходиться на перевірці. Як тільки модератори його перевірять, ми відправимо повідомлення на ваш email { email }.</p> : <p className='lead'>Ваш акаунт вже сертифікований! Ви можете замовляти будь-які товари в нашому інтернет-магазині і користуватись всіма перевагами, що недоступні звичайним користувачам.</p> }
                    <img src={ certificate } alt='' width='250' className='mb-4 mt-4' />
                </header>

                <div className='row py-4'>
                    <div className='col-lg-6 mx-auto'>

                    </div>
                </div>
            </div>
        );
    };
};

export default Certified;