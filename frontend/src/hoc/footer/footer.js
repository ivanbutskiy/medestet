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
                    <p className='font-italic'>Компания MedEstet-Pro. Вместе с вами мы делаем мир прекраснее.</p>
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

                        <Link to='/payments-delivery/'>Оплата и доставка</Link>

                    </div>
                    <div className='col-lg-2 col-md-6 mb-4 mb-lg-0'>
                    <h6 className='text-uppercase font-weight-bold mb-4'>Обучение</h6>
                    <ul className='list-unstyled mb-0'>
                        <li className='mb-2'><Link to='/courses/'>Курсы</Link></li>
                        <li className='mb-2'><Link to='/workshops/'>Семинары</Link></li>
                        <li className='mb-2'><Link to='/webinars/'>Вебинары</Link></li>
                    </ul>
                    </div>
                    <div className='col-lg-2 col-md-6 mb-4 mb-lg-0'>
                    <h6 className='text-uppercase font-weight-bold mb-4'>Сервис</h6>
                    <ul className='list-unstyled mb-0'>
                        <li className='mb-2'><Link to='/shop/'>Магазин</Link></li>
                        <li className='mb-2'><Link to='/video/'>Видео</Link></li>
                        <li className='mb-2'><Link to='/news/'>Новости</Link></li>
                        <li className='mb-2'><Link to='/blog/'>Блог</Link></li>
                    </ul>
                    </div>
                    <div className='col-lg-4 col-md-6 mb-lg-0'>
                    <h6 className='text-uppercase font-weight-bold mb-4'>Подписка</h6>
                    <p className='text-muted mb-4'>Подпишитесь на нашу рассылку, чтобы быть в курсе наших акций и новостей из мира красоты.</p>
                    <div className='p-1 rounded border'>
                        <div className='input-group'>
                        <input type='email' placeholder='Введите свой email' aria-describedby='button-addon1' className='form-control border-0 shadow-0' />
                        <div className='input-group-append'>
                            <button id='button-addon1' type='submit' className='btn btn-link'><i className='fa fa-paper-plane'></i></button>
                        </div>
                        </div>
                    </div>
                    </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                        <p className='text-muted mb-1'>Адрес: Киев ул. Крещатик, 6</p>
                        <p className='text-muted mb-1'>ФОП Качанова Олена Вiталiïвна</p>
                        <p className='text-muted mb-1'>ІПН 2436601081</p>
                        <p className='text-muted mb-1'>Контактный телефон: +380506040238</p>
                      </div>
                    </div>
                </div>

                <div className='py-4'>
                    <div className='container text-center'>
                        <Link to='/privacy-policy/'>Условия использования и политика конфиденциальности</Link>
                        <p className='text-muted mb-0 py-2'>© { year } MedEstet-Pro</p>
                    </div>
                </div>
            </footer>
        );
    };
};

export default Footer;
