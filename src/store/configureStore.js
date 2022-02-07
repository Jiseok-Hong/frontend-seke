/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { setAutoFreeze } from 'immer';
import { persistStore } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './middleware/logger';
import createReducer from './reducers';

setAutoFreeze();

export default function configureStore(initialState = {}) {
    let composeEnhancers = compose;

    // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
        /* eslint-disable no-underscore-dangle */
        if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
            composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

        // NOTE: Uncomment the code below to restore support for Redux Saga
        // Dev Tools once it supports redux-saga version 1.x.x
        // if (window.__SAGA_MONITOR_EXTENSION__)
        //   reduxSagaMonitorOptions = {
        //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
        //   };
        /* eslint-enable */
    }

    const middlewares = [loggerMiddleware, thunkMiddleware];
    const enhancers = [applyMiddleware(...middlewares)];
    const store = createStore(createReducer(), initialState, composeEnhancers(...enhancers));
    const persistor = persistStore(store);

    return { store, persistor };
}
