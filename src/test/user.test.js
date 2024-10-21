import request from 'supertest';
import server from '../utils/server.js';

describe('User API', () => {
  it('should get all users', async () => {
    const res = await request(server).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it('should create a new user', async () => {
    const newUser = { username: 'John', age: 30, hobbies: ['reading'] };
    const res = await request(server).post('/api/users').send(newUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.username).toEqual('John');
  });

  it('should get a user by ID', async () => {
    const newUser = { username: 'John', age: 30, hobbies: ['reading'] };
    const createRes = await request(server).post('/api/users').send(newUser);
    const userId = createRes.body.id;

    const res = await request(server).get(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(userId);
  });

  it('should update a user', async () => {
    const newUser = { username: 'John', age: 30, hobbies: ['reading'] };
    const createRes = await request(server).post('/api/users').send(newUser);
    const userId = createRes.body.id;

    const updatedUser = { username: 'John Doe', age: 31, hobbies: ['writing'] };
    const res = await request(server).put(`/api/users/${userId}`).send(updatedUser);
    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toEqual('John Doe');
  });

  it('should delete a user', async () => {
    const newUser = { username: 'John', age: 30, hobbies: ['reading'] };
    const createRes = await request(server).post('/api/users').send(newUser);
    const userId = createRes.body.id;

    const res = await request(server).delete(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(204);
  });
});
