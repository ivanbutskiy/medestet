import {
    ADD_TO_BASKET,
    DELETE_FROM_BASKET,
    ALREADY_IN_BASKET,
    CLEAR_BASKET
} from './basket-types';

export const addProductToBasket = (slug, title, headerImage, price, count) => dispatch => {
    if (localStorage.getItem('basket-list')) {
        const basketList = JSON.parse(localStorage.getItem('basket-list'));
        if (basketList.findIndex(item => item.slug === slug) !== -1) {

            const index = basketList.findIndex(item => item.slug === slug);
            const basketObject = {
                slug: slug, 
                title: title, 
                headerImage: headerImage,
                price: price,
                count: count,
                summaryPrice: parseFloat(Number(price * count).toFixed(2))
            };
            basketList[index] = basketObject;
            localStorage.setItem('basket-list', JSON.stringify(basketList));
            dispatch({type: ALREADY_IN_BASKET});

        } else {
            const basketObject = {
            slug: slug, 
            title: title, 
            headerImage: headerImage,
            price: price,
            count: count,
            summaryPrice: parseFloat(Number(price * count).toFixed(2))
        };
        basketList.push(basketObject);
        localStorage.setItem('basket-list', JSON.stringify(basketList));

        dispatch({type: ADD_TO_BASKET});
        }

    } else {
        const basketList = []
        const basketObject = {
            slug: slug, 
            title: title, 
            headerImage: headerImage,
            price: price,
            count: count,
            summaryPrice: parseFloat(Number(price * count).toFixed(2))
        };
        basketList.push(basketObject);
        localStorage.setItem('basket-list', JSON.stringify(basketList));

        dispatch({type: ADD_TO_BASKET});
    };
};

export const deleteFromBasket = (slug) => dispatch => {
    const basketList = JSON.parse(localStorage.getItem('basket-list'));
    const index = basketList.findIndex(item => item.slug === slug);
    basketList.splice(index, 1);
    localStorage.setItem('basket-list', JSON.stringify(basketList));

    dispatch({type: DELETE_FROM_BASKET});
};

export const clearBasket = () => async dispatch => {
    localStorage.removeItem('basket-list');

    dispatch({ type: CLEAR_BASKET });
};