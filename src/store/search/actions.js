import constants from './constants';

const searchChange = (params) => {
    return {
        type: constants.SEARCH_ONCHANGE,
        searchValue: params,
    };
};

const actions = {
    searchChange,
};

export default actions;
