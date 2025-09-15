import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import facebook from '../../assets/logos/facebook.png';
import instagram from '../../assets/logos/instagram.png';
import youTube from '../../assets/logos/youtube.png';
import telegram from '../../assets/logos/telegram.webp';

import './footer.css';

class Footer extends Component {

    render() {

        const year = new Date().getUTCFullYear();

        return (
            <footer className='mt-2 shadow-lg'>
                <div className='container py-5'>
                <div className='row py-4'>
                    <div className='col-lg-4 col-md-6 mb-4 mb-lg-0'>
                    {/* <img src={ logo } alt='' width='180' className='mb-3' /> */}
                    <p className='font-italic'>Компанія MedEstet-Pro. Разом з вами ми робимо світ прекраснішим.</p>
                    <ul className='list-inline mt-4'>

                        <li className='list-inline-item'>
                            <a href='https://www.facebook.com/medestetpro' target='_blank' rel='noreferrer' title='Facebook'>
                                <img src={ facebook } alt='Facebook' />
                            </a>
                        </li>

                        <li className='list-inline-item'>
                            <a href='https://www.instagram.com/medestet_pro' target='_blank' rel='noreferrer' title='Instagram'>
                                <img src={ instagram } alt='Instagram' />
                            </a>
                        </li>

                        <li className='list-inline-item'>
                            <a href='https://t.me/Medestetprobot' target='_blank' rel='noreferrer' title='Telegram'>
                                <img src={ telegram } alt='Telegram' />
                            </a>
                        </li>

                        <li className='list-inline-item'>
                            <a href='https://www.youtube.com/channel/UCYVT56f9R5c8P6ScUtnNXRA?view_as=subscriber' target='_blank' rel='noreferrer' title='Youtube'>
                                <img src={ youTube } alt='YouTube' />
                            </a>
                        </li>

                    </ul>

                        <Link to='/payments-delivery/'>Оплата і доставка</Link>

                    </div>
                    <div className='col-lg-2 col-md-6 mb-4 mb-lg-0'>
                    <h6 className='text-uppercase font-weight-bold mb-4'>Навчання</h6>
                    <ul className='list-unstyled mb-0'>
                        <li className='mb-2'><Link to='/courses/'>Курси</Link></li>
                        <li className='mb-2'><Link to='/workshops/'>Семінари</Link></li>
                        <li className='mb-2'><Link to='/webinars/'>Вебінари</Link></li>
                    </ul>
                    </div>
                    <div className='col-lg-2 col-md-6 mb-4 mb-lg-0'>
                    <h6 className='text-uppercase font-weight-bold mb-4'>Сервіс</h6>
                    <ul className='list-unstyled mb-0'>
                        <li className='mb-2'><Link to='/shop/'>Магазин</Link></li>
                        <li className='mb-2'><Link to='/video/'>Відео</Link></li>
                        <li className='mb-2'><Link to='/news/'>Новини</Link></li>
                        <li className='mb-2'><Link to='/blog/'>Блог</Link></li>
                    </ul>
                    </div>
                    <div className='col-lg-4 col-md-6 mb-lg-0'>
                    <h6 className='text-uppercase font-weight-bold mb-4'>Підписка</h6>
                    <p className='text-muted mb-4'>Підпишіться на нашу розсилку, щоб бути в курсі наших акцій та новин зі світу краси.</p>
                    <div className='p-1 rounded border'>
                        <div className='input-group'>
                        <input type='email' placeholder='Введіть свій email' aria-describedby='button-addon1' className='form-control border-0 shadow-0' />
                        <div className='input-group-append'>
                            <button id='button-addon1' type='submit' className='btn btn-link'><i className='fa fa-paper-plane'></i></button>
                        </div>
                        </div>
                    </div>
                    </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                        <p className='text-muted mb-1'>Адреса: Україна, 03035, м. Київ, вул. Громадська, 16 (ФОП)</p>
                        <p className='text-muted mb-1'>ФІЗИЧНА ОСОБА - ПІДПРИЄМЕЦЬ КОВИНЬОВА ІРИНА ВІКТОРІВНА</p>
                        {/*<p className='text-muted mb-1'>ІПН 2436601081</p>*/}
                        <p className='text-muted mb-1'>Контактний телефон: +380 (50) 604 02 38</p>
                      </div>
                    </div>
                </div>

                <div className='py-4'>
                    <div className='container text-center'>
                        <Link to='/privacy-policy/'>Умови використання і політика конфіденційності</Link>
                        <p className='text-muted mb-0 py-2'>© { year } MedEstet-Pro</p>
                    </div>
                </div>
            </footer>
        );
    };
};

export default Footer;
