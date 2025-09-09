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
                <ul className='list-group categories-items-list'>
                    <p className='category-items-error-text'>Поки що немає жодної категорії</p>
                </ul>
            )
        }

        if (error) {
            return (
                <ul className='list-group categories-items-list'>
                    <p className='category-items-error-text'>Сталася помилка завантаження категорій...</p>
                </ul>
            );
        };

        if (!categoriesItems) {
            return (
                <ul className='list-group categories-items-list'>
                    <div className='spinner-shop-categories text-center row align-items-center justify-content-center'>
                        <div className='spinner-content'>
                            <div className='spinner-border text-info' role='status'>
                                <span className='sr-only'>Loading...</span>
                            </div>
                        </div>
                    </div>
                </ul>

            );
        };

        return (
            <ul className='list-group categories-items-list'>
                { categoriesItems }
            </ul>
        );
    };
};

export default CategoriesList;