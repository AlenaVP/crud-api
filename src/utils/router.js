import { parse } from 'url';
import { getUsers } from '../controller/userController.js'

const router = (req, res) => {
  const parsedUrl = parse(req.url, true);
  const { pathName } = parsedUrl;

  if (pathName === '/api/users' && req.method === 'GET') {
    getUsers(req,res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
}

export default router;
