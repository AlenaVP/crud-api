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
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
}

export default router;
