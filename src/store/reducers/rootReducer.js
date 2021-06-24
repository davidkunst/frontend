import commonReducer from './commonReducer';
import authReducer from './authReducer';

import { combineReducers } from 'redux';

import storage from 'redux-persist/lib/storage';

import { persistReducer } from 'redux-persist';

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['token','refreshToken', 'isLoggedIn', 'user', 'userId']
}

const commonPersistConfig = {
    key: 'common',
    storage: storage,
    whitelist: ['sessionId', 'region']
}

const rootReducer = combineReducers({
    common: persistReducer(commonPersistConfig, commonReducer),
    auth: persistReducer(authPersistConfig, authReducer),
})

export default rootReducer;