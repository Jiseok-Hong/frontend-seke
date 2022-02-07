import constants from './constants';

const navbarOpenTrue = (params) => {
    return {
        type: constants.NAVBAR_OPEN_TRUE,
        open: params,
    };
};
const denseLock = (params) => {
    return {
        type: constants.DENSE_LOCK,
        lock: params,
    };
};
const actions = {
    navbarOpenTrue,
    denseLock,
};

export default actions;
