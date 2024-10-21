import cluster from 'cluster';
import os from 'os';
import http from 'http';
import dotenv from 'dotenv';
import router from './src/utils/router.js';

dotenv.config();

const PORT = parseInt(process.env.PORT, 10) || 3000;
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs - 1; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const server = http.createServer((req, res) => {
    router(req, res);
  });

  server.listen(PORT + cluster.worker.id, () => {
    console.log(`Worker ${process.pid} started on port ${PORT + cluster.worker.id}`);
  });
}
