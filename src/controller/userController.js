import { validate as isUuid, v4 as uuidv4 } from 'uuid';

const users = [];

export const getUsers = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
};

export const getUserById = (req, res, userId) => {
  if (!isUuid(userId)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid user ID' }));
    return;
  }

  const user = users.find((u) => u.id === userId);

  if (!user) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(user));
};

export const createUser = (req, res) => {
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const { username, age, hobbies } = JSON.parse(body);

    if (!username || !age || !Array.isArray(hobbies)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid request body' }));
      return;
    }

    const newUser = {
      id: uuidv4(),
      username,
      age,
      hobbies
    };

    users.push(newUser);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newUser));
  });
};

export const updateUser = (req, res, userId) => {
  if (!isUuid(userId)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid user ID' }));
    return;
  }

  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }

  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const { username, age, hobbies } = JSON.parse(body);

    if (!username || !age || !Array.isArray(hobbies)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid request body' }));
      return;
    }

    const updatedUser = {
      id: userId,
      username,
      age,
      hobbies
    };

    users[userIndex] = updatedUser;

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(updatedUser));
  });
};

export const deleteUser = (req, res, userId) => {
  if (!isUuid(userId)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid user ID' }));
    return;
  }

  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }

  users.splice(userIndex, 1);

  res.writeHead(204);
  res.end();
};
