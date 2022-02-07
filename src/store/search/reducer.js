import produce from 'immer';
import constants from './constants';
import { initialState } from './state';

const reducer = (state = initialState, action) =>
    produce(state, (draft) => {

        switch (action.type) {
            case constants.SEARCH_ONCHANGE:
                draft.searchValue = action.searchValue;
                break;
            default:
                break;
        }
    });

export default reducer;
