/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import globalReducer from './global/reducer';
import userReducer from './user/reducer';
import navbarReducer from './navbar/reducer';
import searchReducer from './search/reducer';
import filterReducer from './filter/reducer';
import searchHistory from './searchHistory/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
    const rootReducer = combineReducers({
        global: globalReducer,
        user: userReducer,
        navbar: navbarReducer,
        search: searchReducer,
        filter: filterReducer,
        history: searchHistory,
        ...injectedReducers,
    });

    return rootReducer;
}
