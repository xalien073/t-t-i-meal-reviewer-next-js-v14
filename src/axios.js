import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://tmr-api.azurewebsites.net',
  // baseURL: 'http://localhost:7071',
});

export default instance;
