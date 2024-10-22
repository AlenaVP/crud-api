import http from 'http';
import { parse } from 'url';
import pkg from 'http-proxy';
import dotenv from 'dotenv';
import os from 'os';

dotenv.config();

const { createProxyServer } = pkg;

const PORT = parseInt(process.env.PORT, 10) || 3000;
const numCPUs = os.cpus().length;
const proxy = createProxyServer({});
let currentWorker = 0;

const targetPort = PORT + 1 + (currentWorker % (numCPUs - 1));

const server = http.createServer((req, res) => {
  currentWorker++;
  proxy.web(req, res, { target: `http://localhost:${targetPort}` });
});

server.listen(PORT, () => {
  console.log(`Load balancer is running on port ${PORT}`);
});
