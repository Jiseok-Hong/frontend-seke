import RequestService from '../RequestService';

const API_BASE_URL = process.env.REACT_APP_AUTH_API_URL;

const checkHealth = () => {
    const query = {
        name: 'Water_Bottle',
        price: 111,
        in_stock: 0,
    };
    const url = `http://localhost:9200/wikipedias/_doc`;
    console.log(query);
    return RequestService.post(url, {
        data: JSON.stringify(query),
    })
        .then((res) => ({ status: 1, data: res.data }))
        .catch((error) => ({ status: 0, code: error.response && error.response.status, error: error.response }));
};

const NewApi = {
    checkHealth,
};

export default NewApi;
