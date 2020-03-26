import axios from 'axios';

const BASE_URL = 'http://13.233.33.10:8091';
const headers = {
    "Content-Type": "application/json"
};
axios.defaults.baseURL = BASE_URL;

export default {
    signIn(email, password) {
        return axios.post('/signin', { email, password }, {headers: headers});
    },

    register(name, email, password) {
        return axios.post('/createAccount', { name, email, password, key: 'test' }, {headers: headers});
    },

    createOrder(type, file,  authToken){
        return axios.post('/createOrder', { "orderType":type, "authToken": authToken, "file": file });
    },

    getAllOrders(accountId, authToken){
        const value = axios.post('/getOrders', { "accountID": accountId, "authToken": authToken });
        console.log(value);
        return value;
    }
};
