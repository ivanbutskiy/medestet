import {
    ADD_TO_BASKET,
    DELETE_FROM_BASKET,
    ALREADY_IN_BASKET,
    CLEAR_BASKET
} from '../actions/basket-types';

const getCount = () => {
    if (localStorage.getItem('basket-list')) {
        return JSON.parse(localStorage.getItem('basket-list')).length;
    } else {
        return 0;
    };
};

const getBasketList = () => {
    if (localStorage.getItem('basket-list')) {
        return JSON.parse(localStorage.getItem('basket-list'));
    } else {
        return []
    };
};

const initialState = {
    basketList: getBasketList(),
    count: getCount()
};

function basketReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_BASKET:
            return {...state, count: getCount(), basketList: getBasketList()};
        case DELETE_FROM_BASKET:
            return {...state, count: getCount(), basketList: getBasketList()};
        case CLEAR_BASKET:
            return {...state, count: getCount(), basketList: getBasketList()};
        case ALREADY_IN_BASKET:
            return {...state, count: getCount(), basketList: getBasketList()};
        default:
            return {...state};
    };
};

export default basketReducer;