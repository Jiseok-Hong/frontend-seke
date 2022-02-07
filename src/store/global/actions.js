import constants from './constants';

const showAlertModal = (params) => {
    return {
        type: constants.SHOW_ALERT_MODAL,
        payload: { ...params, showModal: true },
    };
};

const dismissAlertModal = (params) => {
    return {
        type: constants.DISMISS_ALERT_MODAL,
        payload: { ...params, showModal: false },
    };
};

const showConfirmModal = (params) => {
    return {
        type: constants.SHOW_CONFIRM_MODAL,
        payload: { ...params, showModal: true },
    };
};

const dismissConfirmModal = (params) => {
    return {
        type: constants.DISMISS_CONFIRM_MODAL,
        payload: { ...params, showModal: false },
    };
};

const showErrorModal = (params) => {
    return {
        type: constants.SHOW_ERROR_MODAL,
        payload: { ...params, showModal: true },
    };
};

const dismissErrorModal = (params) => {
    return {
        type: constants.DISMISS_ERROR_MODAL,
        payload: { ...params, showModal: false },
    };
};

const showTopLoadingBar = (params) => {
    return {
        type: constants.SHOW_TOP_LOADING_BAR,
        payload: { ...params, showBar: true },
    };
};

const dismissTopLoadingBar = (params) => {
    return {
        type: constants.DISMISS_TOP_LOADING_BAR,
        payload: { ...params, showBar: true },
    };
};

const actions = {
    showAlertModal,
    dismissAlertModal,
    showConfirmModal,
    dismissConfirmModal,
    showErrorModal,
    dismissErrorModal,
    showTopLoadingBar,
    dismissTopLoadingBar,
};

export default actions;
