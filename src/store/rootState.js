import { initialState as globalState } from 'store/global/state';
import { initialState as userState } from 'store/user/state';
import { initialState as navbarState } from 'store/navbar/state';
import { initialState as searchState } from 'store/search/state';
import { initialState as snackbarState } from 'store/snackbar/state';
import { initialState as historyState } from 'store/searchHistory/state';
const rootState = {
    global: globalState,
    user: userState,
    navbar: navbarState,
    search: searchState,
    snackbar: snackbarState,
    history: historyState,
};

export default rootState;
