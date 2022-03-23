import RequestService from '../RequestService';

const API_BASE_URL = process.env.REACT_APP_AUTH_API_URL;

const signInWithAccount = (auth) => {
    const url = `${API_BASE_URL}/api`;
    return RequestService.post(url, null, { auth })
        .then((res) => ({ status: 1, data: res.data }))
        .catch((error) => ({ status: 0, code: error.response && error.response.status, error: error.response }));
};

const OldApi = {
    signInWithAccount,
};

export default OldApi;
