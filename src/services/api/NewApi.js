import RequestService from '../RequestService';

const API_BASE_URL = process.env.REACT_APP_AUTH_API_URL;

const searchNew = (searchVal, page) => {
    const query = {
        size: 10,
        from: 0 + page * 10,
        query: {
            multi_match: {
                query: searchVal,
                fields: ['title', 'text'],
            },
        },
    };

    const url = `http://localhost:9200/enwiki/_search`;
    return RequestService.get(url, {
        params: {
            source: JSON.stringify(query),
            source_content_type: 'application/json',
        },
    })
        .then((res) => ({ status: 1, data: res.data.hits }))
        .catch((error) => ({ status: 0, code: error.response && error.response.status, error: error.response }));
};

const NewApi = {
    searchNew,
};

export default NewApi;
