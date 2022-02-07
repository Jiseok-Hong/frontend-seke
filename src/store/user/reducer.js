import produce from 'immer';
import constants from './constants';
import { initialState } from './state';
import Cookies from 'cookies-js';
import { persistReducer } from 'redux-persist';
import { CookieStorage } from 'redux-persist-cookie-storage';

// save locale value in cookie
const persistConfig = {
    key: 'user',
    storage: new CookieStorage(Cookies),
};

const userReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case constants.SET_USER_INFO:
                draft.memberInfo = action.payload;
                break;
            case constants.CLEAR_USER_INFO:
                draft.memberInfo = {};
                break;
            default:
                break;
        }
    });

export default persistReducer(persistConfig, userReducer);
