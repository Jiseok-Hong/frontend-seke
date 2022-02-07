import React from 'react';
import './themes/styles.global.scss';
import AppRouter from 'containers/AppRouter';
import { Provider } from 'react-redux';
import ModalContainer from 'containers/ModalContainer';
import LoadingContainer from 'containers/LoadingContainer';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <AppRouter />
                <ModalContainer />
                <LoadingContainer />
            </PersistGate>
        </Provider>
    );
}

export default App;
