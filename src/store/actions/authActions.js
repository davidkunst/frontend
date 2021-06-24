import api from '../../api';

import {  
    ACTION_STORE_ALL_USERS,
    ACTION_SET_USER_INFORMATION,
    ACTION_STORE_JWT_TOKEN,
    ACTION_LOGOUT_USER,
    ACTION_STORE_ALL_TRANSACTIONS,
    ACTION_STORE_ALL_INVESTMENTS,
    ACTION_STORE_ALL_PRICES,
} from './authActionsList';

import history from '../router/history';

export const setUserInfo = (user, token) => {
    return async (dispatch, getState) => {
        console.log(user.balance)
        if(!token)
            token = getState().auth.token;
        dispatch(ACTION_SET_USER_INFORMATION(user, token));   
    }
}

export const logout = () => {
    return (dispatch, getState) => {
        dispatch(ACTION_LOGOUT_USER());
        history.replace('/')
    }
}

export const setToken = (token) => {
    return (dispatch, getState) => {
        dispatch(ACTION_STORE_JWT_TOKEN(token));
    }
}

export const storeUsers = (users) => {
    return (dispatch, getState) => {
        dispatch(ACTION_STORE_ALL_USERS(users));
    }
}

export const storeTransactions = (transactions) => {
    return (dispatch, getState) => {
        dispatch(ACTION_STORE_ALL_TRANSACTIONS(transactions));
    }
}

export const storeInvestments = (investments) => {
    return (dispatch, getState) => {
        dispatch(ACTION_STORE_ALL_INVESTMENTS(investments));
    }
}
export const storePrices = (prices) => {
    return (dispatch, getState) => {
        dispatch(ACTION_STORE_ALL_PRICES(prices));
    }
}