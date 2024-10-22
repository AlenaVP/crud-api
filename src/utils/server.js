import http from 'http';
import router from './router.js';

const server = http.createServer(router);

export default server;
