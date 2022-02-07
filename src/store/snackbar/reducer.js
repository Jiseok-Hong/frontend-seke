import produce from 'immer';
import constants from './constants';
import { initialState } from './state';

const reducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {

            case constants.SHOW_SUCCESS_SNACKBAR:
                draft.successSnackBar = action.payload;
                break;

            case constants.SHOW_ERROR_SNACKBAR:
                draft.errorSnackBar = action.payload;
                break;

            case constants.CLOSE_SUCCESS_SNACKBAR:
                draft['successSnackBar']['open'] = false;
                break;

            case constants.CLOSE_ERROR_SNACKBAR:
                draft['errorSnackBar']['open'] = false;
                break;

            default:
                break;
        }
    });

export default reducer;