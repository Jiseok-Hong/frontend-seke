import RequestService from '../RequestService';

// const API_BASE_URL = process.env.REACT_APP_AUTH_API_URL;

const searchNew = (searchVal) => {
    const query = {
        size: 50,
        from: 0,
        query: {
            bool: {
                must: [
                    {
                        multi_match: {
                            query: searchVal,
                            fields: ['title', 'text'],
                        },
                    },
                ],
                should: [
                    {
                        match: {
                            query: searchVal,
                        },
                    },
                ],
            },
        },
    };

    const url = `http://localhost:9200/enwiki/_search?search_type=dfs_query_then_fetch`;
    return RequestService.get(url, {
        params: {
            source: JSON.stringify(query),
            source_content_type: 'application/json',
        },
    })
        .then((res) => ({ status: 1, data: res.data.hits }))
        .catch((error) => ({ status: 0, code: error.response && error.response.status, error: error.response }));
};

const searchRelevanceNew = (searchVal) => {
    const query = {
        size: 50,
        from: 0,
        query: {
            script_score: {
                query: {
                    multi_match: {
                        query: searchVal,
                        fields: ['title', 'text'],
                    },
                },
                script: {
                    source: "if(!doc['count'].empty) {_score * (doc['popularity_score'].value / 10000) * doc['count'].value } else {_score * 0.0004}",
                },
            },
        },
    };
    const url = `http://localhost:9200/enwiki/_search?search_type=dfs_query_then_fetch`;
    return RequestService.get(url, {
        params: {
            source: JSON.stringify(query),
            source_content_type: 'application/json',
        },
    })
        .then((res) => ({ status: 1, data: res.data.hits }))
        .catch((error) => ({ status: 0, code: error.response && error.response.status, error: error.response }));
};

const categoryMatchNum = (documentId, count) => {
    const url = `http://localhost:9200/enwiki/_update/` + documentId;
    return RequestService.post(url, { script: 'ctx._source.count = ' + count })
        .then((res) => ({ status: 1, data: res.data.result }))
        .catch((error) => ({ status: 0, code: error.response && error.response.status, error: error.response }));
};

const NewApi = {
    searchNew,
    searchRelevanceNew,
    categoryMatchNum,
};

export default NewApi;
