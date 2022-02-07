import constants from './constants';

const applyFilterProduct = (params) => {
    return {
        type: constants.APPLY_FILTER_PRODUCT,
        payload: { ...params },
    };
};

const removeFilterProduct = (params) => {
    return {
        type: constants.REMOVE_FILTER_PRODUCT,
        payload: { ...params, categories: [] },
    };
};
const actions = {
    applyFilterProduct,
    removeFilterProduct,
};

export default actions;
