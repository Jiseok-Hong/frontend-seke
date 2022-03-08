import produce from 'immer';
import constants from './constants';
import { initialState } from './state';

const reducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case constants.SEARCH_UPDATE:
                draft.searchHistory = draft.searchHistory.map((history) => {
                    if (String(history?.value) == String(action.searchHistory)) {
                        return { value: action.searchHistory, times: history.times + 1 };
                    }
                    return { value: action.searchHistory, times: 1 };
                });

                break;
            default:
                break;
        }
    });

export default reducer;
