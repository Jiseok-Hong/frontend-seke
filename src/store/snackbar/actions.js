import constants from './constants';

const showSuccessSnackBar = (params) => {
    return {
        type: constants.SHOW_SUCCESS_SNACKBAR,
        payload: { ...params, open: true }
    };
};
const closeSuccessSnackBar = (params) => {
    return {
        type: constants.CLOSE_SUCCESS_SNACKBAR,
        payload: { ...params, open: false }
    };
};

const showErrorSnackBar = (params) => {
    return {
        type: constants.SHOW_ERROR_SNACKBAR,
        // payload: params,
        payload: { ...params, open: true }
    };
};
const closeErrorSnackBar = (params) => {
    return {
        type: constants.CLOSE_ERROR_SNACKBAR,
        payload: { ...params, open: false }
    };
};

const clearSnackBar = () => {
    return dispatch => {
        dispatch({ type: constants.SNACKBAR_CLEAR });
    };
};

const actions = {
    showSuccessSnackBar,
    showErrorSnackBar,
    clearSnackBar,
    closeErrorSnackBar,
    closeSuccessSnackBar
};

export default actions;