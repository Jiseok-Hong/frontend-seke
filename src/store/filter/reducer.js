import produce from 'immer';
import constants from './constants';
import { initialState } from './state';

const reducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case constants.APPLY_FILTER_PRODUCT:
                draft.productFilter = action.payload;
                break;
            case constants.REMOVE_FILTER_PRODUCT:
                draft.productFilter = action.payload;
                break;
            default:
                break;
        }
    });

export default reducer;
