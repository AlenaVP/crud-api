import http from 'http';
import { parse } from 'url';
import { v4 as uuidv4 } from 'uuid';

const users = [];

const requestListener = (req, res) => {
  const parsedUrl = parse(req.url, true);
  const { pathname } = parsedUrl;

  if (pathname === '/api/users' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
};

const server = http.createServer(requestListener);

export default server;
