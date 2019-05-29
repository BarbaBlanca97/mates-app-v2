import axios from 'axios';

const baseUrl = '/api'

const getLoans = function () {
    return axios.get(baseUrl + '/prestamos')
        .then(function(res){
            return res.data;
        })
        .catch(function(error){
            return [];
        });    
}

export default {
    getLoans
}