import { parse } from 'url';
import { getUsers } from '../controller/userController.js'

const router = (req, res) => {
  const parsedUrl = parse(req.url, true);
  const { pathName } = parsedUrl;

  if (pathName === '/api/users' && req.method === 'GET') {
    getUsers(req,res);
  } else if (pathName.match(/^\/api\/users\/\w+$/) && req.method === 'GET') {
    const userId = pathName.split('/')[3];
    getUserById(req, res, userId);
  } else if (pathName === '/api/users' && req.method === 'POST') {
    createUser(req, res);
  } else if (pathName.match(/^\/api\/users\/\w+$/) && req.method === 'PUT') {
    const userId = pathName.split('/')[3];
    updateUser(req, res, userId);
  } else if (pathname.match(/^\/api\/users\/\w+$/) && req.method === 'DELETE') {
    const userId = pathname.split('/')[3];
    deleteUser(req, res, userId);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
}

export default router;
