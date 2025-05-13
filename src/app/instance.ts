import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/images/search?limit=100',
    timeout: 3000
});

export default instance;