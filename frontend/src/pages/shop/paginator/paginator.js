import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import './paginator.css';

class Paginator extends Component {

    state = {
        slug: '',
        currentPage: '',
        nextPage: '',
        previousPage: '',
        count: ''
    };

    getData() {
        this.setState({
            currentPage: this.props.match.params.page,
            slug: this.props.match.params.slug,
            previousPage: this.props.previousPage,
            nextPage: this.props.nextPage,
            count:this.props.count
        });
    };

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.getData();
        };
    };

    componentDidMount() {
        this.getData();
    };

    render() {

        let { slug, currentPage, previousPage, nextPage, count } = this.state;

        if (!currentPage) {
            currentPage = 1;
        } else {
            currentPage = parseInt(currentPage);
        };

        if (nextPage) {
            nextPage = currentPage + 1; 
        } else {
            nextPage = null;
        };

        if (previousPage) {
            previousPage = currentPage - 1;
        } else {
            previousPage = null; 
        };

        let addr = '';
        if (slug) {
            addr = `/shop/category/${slug}/`
        } else {
            addr = '/shop/'
        };

        let toStart = '';
        if (currentPage && parseInt(currentPage) !== 1) {
            toStart = 1;
        } else {
            toStart = null;
        };

        let toEndPage = '';
        if (count % 30 === 0) {            
            toEndPage = count / 30;
        } else {
            toEndPage = (parseInt(count / 30) + 1);
        };

        return (

            <nav aria-label='Page navigation example'>
                <ul className='pagination justify-content-center mt-5'>

                    { toStart ? <li className='page-item'>
                        <Link className='page-link' to={`${addr}`} aria-label='Start'>
                            <span aria-hidden='true'>&laquo;</span>
                        </Link>
                    </li> : null }

                    { previousPage ? <li className='page-item'><Link className='page-link' to={`${addr}${previousPage}/`}>{ previousPage }</Link></li> : null }

                    { currentPage ? <li className='page-item active'><Link className='page-link' to={`${addr}${currentPage}/`}>{ currentPage }</Link></li> : <li className='page-item active'><Link className='page-link' to='/'>1</Link></li> }
                    
                    { nextPage ? <li className='page-item'><Link className='page-link' to={`${ addr }${ nextPage }/`}>{ nextPage }</Link></li> : null}

                    { nextPage ? <li className='page-item'>
                        <Link className='page-link' to={`${ addr }${ toEndPage }/`} aria-label='End'>
                            <span aria-hidden='true'>&raquo;</span>
                        </Link>
                    </li> : null }

                </ul>
            </nav>
        );
    };
};

export default withRouter(Paginator);
