import { parse } from 'url';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controller/userController.js';

const router = (req, res) => {
  try {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (pathname === '/api/users' && req.method === 'GET') {
      getUsers(req, res);
    } else if (pathname.match(/^\/api\/users\/[\w-]{36}$/) && req.method === 'GET') {
      const userId = pathname.split('/')[3];
      getUserById(req, res, userId);
    } else if (pathname === '/api/users' && req.method === 'POST') {
      createUser(req, res);
    } else if (pathname.match(/^\/api\/users\/[\w-]{36}$/) && req.method === 'PUT') {
      const userId = pathname.split('/')[3];
      console.log('User ID from URL:', userId);
      updateUser(req, res, userId);
    } else if (pathname.match(/^\/api\/users\/[\w-]{36}$/) && req.method === 'DELETE') {
      const userId = pathname.split('/')[3];
      deleteUser(req, res, userId);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Not Found' }));
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal Server Error' }));
  }
}

export default router;
