import axios from 'axios';

const BASE_URL = 'https://epass.egovernments.org:8091';

const headers = {
    'Content-Type': 'application/json',
};
const fileHeaders = {
    'Content-Type': 'multipart/form-data',
};

axios.defaults.baseURL = BASE_URL;

export default {
    signIn(email, password) {
        return axios.post('/signin', { email, password }, { headers: headers });
    },

    register(name, email, password) {
        return axios.post(
            '/createAccount',
            { name, email, password, key: 'test' },
            { headers: headers },
        );
    },

    createOrder(formData) {
        return axios.post('/createOrder', formData, { headers: fileHeaders });
    },

    getAllOrders() {
        const value = axios.post(
            '/getOrders',
            {
                accountID: localStorage.getItem('accountID'),
                authToken: localStorage.getItem('auth'),
            },
            { headers: headers },
        );
        return value;
    },
};
