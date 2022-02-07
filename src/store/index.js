import configureStore from "./configureStore";

const initialState = {};
export const { store, persistor } = configureStore(initialState);
