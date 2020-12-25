import React, { Component } from 'react';

import MedestetService from '../../../service/medestet-service';
import CategoryItem from '../category-item';

import './categories-list.css';

class CategoriesList extends Component {

    service = new MedestetService();

    state = {
        categoriesItems: '',
        categoriesEmpty: false,
        error: false
    };

    getCategoryItems() {
        this.service.getShopCategoriesList()
            .then((categories) => {
                if (categories.status === 200) {
                    if (categories.data.count > 0 ) {
                        this.setState({
                            categoriesItems: categories.data.results.map((category) => {
                                return <CategoryItem
                                    key={ category.id }
                                    title={ category.title }
                                    image={ category.preview_category_icon }
                                    slug={ category.slug }
                                />
                            })
                        })
                    } else {
                        this.setState({ categoriesEmpty: true })
                    };
                } else {
                    this.setState({ error: true });
                };
            })
            .catch(error => {
                this.setState({ error: true })
            }) 
    };

    componentDidMount() {
        this.getCategoryItems();
    };

    render() {

        const { categoriesItems, error, categoriesEmpty } = this.state;

        if (categoriesEmpty) {
            return (
                <div className='category-list-card shadow-sm align-items-center justify-content-center'>
                    <p className='category-items-error-text'>Пока что нет ни одной категории</p>
                </div>
            )
        }

        if (error) {
            return (
                <div className='category-list-card shadow-sm align-items-center justify-content-center'>
                    <p className='category-items-error-text'>Произошла ошибка загрузки категорий...</p>
                </div>
            );
        };

        if (!categoriesItems) {
            return (
                <div className='category-list-card shadow-sm'>
                    <div className='spinner-shop-categories text-center row align-items-center justify-content-center'>
                        <div className='spinner-content'>
                            <div className='spinner-border text-info' role='status'>
                                <span className='sr-only'>Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <div className='category-list-card shadow-sm'>
                { categoriesItems }
            </div>
        );
    };
};

export default CategoriesList;