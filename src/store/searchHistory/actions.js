import constants from './constants';

const searchUpdate = (params) => {
    return {
        type: constants.SEARCH_UPDATE,
        searchHistory: params,
    };
};

const actions = {
    searchUpdate,
};

export default actions;
