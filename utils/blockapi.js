import axios from "axios";
import baseUrl from './baseURL';

export default {

    googleOauth: function (data) {
        return axios.post(`${baseUrl}/api/googleOauth`, data)
    },
    signUp: function (data) {
        return axios.post(`${baseUrl}/api/signUp`, data)
    },
    logOut: function(){
        return axios.post(`${baseUrl}/api/logout`)
    },
    logIn: function (data) {
        return axios.post(`${baseUrl}/api/logIn`, data)
    },
    getAddressBalance: function (data) {
        return axios.get(`${baseUrl}/api/blockchain/balance/` + data)
    },
    getUserTransactions: function (data) {
        return axios.get(`${baseUrl}/api/blockchain/transactions/` + data)
    },
    getLatestUserTransactions: function (data) {
        return axios.get(`${baseUrl}/api/blockchain/latest/transactions/` + data)
    },    
    getUsername: function (data) {
        return axios.get(`${baseUrl}/api/profile/user/username/` + data)
    },
    sendTransaction: function (data) {
        return axios.post(`${baseUrl}/api/blockchain/transactions`, data)
    },
    getSessions: function (data) {
        return axios.get(`${baseUrl}/api/sessions`)
    },
    checkPrivateKeyMatch: function (data) {
        return axios.delete(`${baseUrl}/api/delete/` + data)
    },
    getINR: function (data) {
        return axios.get(`${baseUrl}/api/blockchain/coinValue`)
    },
    startMining: function () {
        return axios.get(`${baseUrl}/api/blockchain/mine`)
    },
    getValueData: function(data) {
        return axios.get(`${baseUrl}/api/blockchain/valueData`)
    },
    addTransaction: function (data) {
        return axios.post(`${baseUrl}/api/blockchain/addTransaction`, data)
    },
}

// return axios.post(`http://localhost:3001/api/signUp`, data, {
//     mode: 'cors',
//     credentials: 'include'
//   });

// return axios({
//     method: 'post', //you can set what request you want to be
//     url: 'http://localhost:3001/api/signUp',
//     data: data,
//     crossDomain: true,
//     headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     }
// })