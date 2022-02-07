import produce from 'immer';
import constants from './constants';
import { initialState } from './state';

const reducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case constants.NAVBAR_OPEN_TRUE:
                draft.open = action.open && !draft.open;
                break;
            case constants.DENSE_LOCK:
                draft.lock = action.lock && !draft.lock;
                break;
            default:
                break;
        }
    });

export default reducer;
