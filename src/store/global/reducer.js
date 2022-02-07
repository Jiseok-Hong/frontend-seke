import produce from 'immer';
import constants from './constants';
import { initialState } from './state';

const reducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case constants.SHOW_ALERT_MODAL:
                draft.alertModal = action.payload;
                break;
            case constants.DISMISS_ALERT_MODAL:
                draft.alertModal = action.payload;
                break;
            case constants.SHOW_CONFIRM_MODAL:
                draft.confirmModal = action.payload;
                break;
            case constants.DISMISS_CONFIRM_MODAL:
                draft.confirmModal = action.payload;
                break;
            case constants.SHOW_ERROR_MODAL:
                draft.errorModal = action.payload;
                break;
            case constants.DISMISS_ERROR_MODAL:
                draft.errorModal = action.payload;
                break;
            case constants.SHOW_TOP_LOADING_BAR:
                draft.topLoadingBar = action.payload;
                break;
            case constants.DISMISS_TOP_LOADING_BAR:
                draft.topLoadingBar = action.payload;
                break;
            default:
                break;
        }
    });

export default reducer;
