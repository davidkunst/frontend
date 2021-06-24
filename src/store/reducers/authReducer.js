import {
    REGISTRATION_IN_PROGRESS,
    REGISTRATION_COMPLETED,
    SET_USER_INFORMATION,
    STORE_JWT_TOKEN,
    LOGOUT_USER,
    STORE_FETCHED_USERS,
    STORE_ALL_TRANSACTIONS,
    STORE_ALL_INVESTMENTS,
    STORE_ALL_PRICES
} from '../constants';


const initState = {
    isLoggedIn: false,
    registering: false,
    loggingIn: false,
    sendingResetEmail: false,
    resetEmailSent: false,
    resettingPassword: false,
    user: {},
    userId: null,
    token: null,
    refreshToken: null,
    error: null,
    resetPasswordModalOpen: false,
    registrationModalOpen: false,
    notifications: [],
    fetchingUserInfo: false,
    fetchingAllUsers: false,
    users: [],
    deletingUser: false,
    editingUser: false,
    transactions: [],
    investments: [],
    prices: [],
}

const authReducer = (state = initState, action) => {

    switch (action.type) {
        case REGISTRATION_IN_PROGRESS: {
            return {
                ...state,
                registering: true
            }
        }

        case REGISTRATION_COMPLETED: {
            return {
                ...state,
                registering: false
            }
        }

        case SET_USER_INFORMATION: {
            
            return {
                ...state,
                user: {...action.payload.user},
                token: action.payload.token,
                isLoggedIn: true
            }
        }

        case STORE_JWT_TOKEN: {
            return {
                ...state,
                token: action.payload
            }
        }
        case STORE_FETCHED_USERS: {
            return {
                ...state,
                users: action.payload
            }
        }

        case LOGOUT_USER: {
            return {
                ...state,
                isLoggedIn: false,
                user: {},
                userId: null,
                token: null,
            }
        }
        case STORE_ALL_TRANSACTIONS: {
            return {
                ...state,
                transactions: action.payload
            }
        }
        case STORE_ALL_INVESTMENTS: {
            return {
                ...state,
                investments: action.payload
            }
        }
        case STORE_ALL_PRICES: {
            return {
                ...state,
                prices: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default authReducer;