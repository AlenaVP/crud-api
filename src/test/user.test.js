import request from 'supertest';
import server from '../utils/server.js';

describe('User API', () => {
  let userId;

  it('should get all users (initially empty)', async () => {
    const res = await request(server).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it('should create a new user', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({
        username: 'John Doe',
        age: 30,
        hobbies: ['reading', 'gaming']
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    userId = res.body.id;
  });

  it('should get the created user by ID', async () => {
    const res = await request(server).get(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', userId);
  });

  it('should update the user', async () => {
    const res = await request(server)
      .put(`/api/users/${userId}`)
      .send({
        username: 'Jane Doe',
        age: 25,
        hobbies: ['writing', 'traveling']
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', 'Jane Doe');
  });

  it('should delete the user', async () => {
    const res = await request(server).delete(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(204);
  });

  it('should return 404 for deleted user', async () => {
    const res = await request(server).get(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(404);
  });
});
