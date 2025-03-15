import axios from 'axios';

//const baseURL = 'http://localhost:8000';
// const baseURL = process.env.NEXT_PUBLIC_TMR_API_URL //|| 'https://tmr-api.azurewebsites.net';// Default value
// const apiURL = 'fastapi-service';
// const apiURL = 'http://fastapi-app-service.tmr.svc.cluster.local:80'
const apiURL = 'http://tmr-api-service.default.svc.cluster.local:80'

// const baseURL = 'http://10.97.221.13';
const instance = axios.create({
  baseURL: apiURL
});

export default instance;

// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'https://tmr-api.azurewebsites.net',
//   // baseURL: 'http://localhost:7071',
//   // baseURL: 'http://localhost:7072'
// });

// export default instance;
