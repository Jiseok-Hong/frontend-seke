import axios from 'axios';

// Return errors if fetch is not done in 30000 ms.
const RequestService = axios.create({
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default RequestService;

