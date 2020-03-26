import axios from 'axios';

const BASE_URL = 'http://13.233.33.10:8091';

axios.defaults.baseURL = BASE_URL;

export default {
    signIn(email, password) {
        return axios.post('/signin', { email, password });
    },

    register( name, email, password) {
        return axios.post('/createAccount', { name, email, password, key: 'test' });
    },
};
