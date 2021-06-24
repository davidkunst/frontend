import {
    REGISTRATION_IN_PROGRESS,
    REGISTRATION_COMPLETED,
    SET_USER_INFORMATION,
    STORE_JWT_TOKEN,
    LOGIN_IN_PROGRESS,
    LOGIN_COMPLETED,
    LOGOUT_USER,
    STORE_FETCHED_USERS,
    STORE_ALL_TRANSACTIONS,
    STORE_ALL_INVESTMENTS,
    STORE_ALL_PRICES
} from '../constants';

export const ACTION_REGISTRATION_IN_PROGRESS = () => { return { type: REGISTRATION_IN_PROGRESS } };
export const ACTION_REGISTRATION_COMPLETED = () => { return { type: REGISTRATION_COMPLETED } };
export const ACTION_LOGIN_IN_PROGRESS = () => { return { type: LOGIN_IN_PROGRESS } };
export const ACTION_LOGIN_COMPLETED = () => { return { type: LOGIN_COMPLETED } };
export const ACTION_SET_USER_INFORMATION = (user, token) => { return { type: SET_USER_INFORMATION, payload: { user: user, token: token } } };
export const ACTION_STORE_JWT_TOKEN = (token) => { return { type: STORE_JWT_TOKEN, payload: token } };
export const ACTION_LOGOUT_USER = () => { return { type: LOGOUT_USER } };
export const ACTION_STORE_ALL_USERS = (users) => { return { type: STORE_FETCHED_USERS, payload: users}}
export const ACTION_STORE_ALL_TRANSACTIONS = (transactions) => { return { type: STORE_ALL_TRANSACTIONS, payload: transactions}}
export const ACTION_STORE_ALL_INVESTMENTS = (investments) => { return { type: STORE_ALL_INVESTMENTS, payload: investments }}
export const ACTION_STORE_ALL_PRICES = (prices) => { return { type: STORE_ALL_PRICES, payload: prices }}