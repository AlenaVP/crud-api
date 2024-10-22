import http from 'http';
import server from '../utils/server.js';

describe('User API', () => {
  let serverInstance;
  let userId;

  beforeAll((done) => {
    serverInstance = server.listen(3000, done);
  });

  afterAll((done) => {
    serverInstance.close(done);
  });

  it('should get all users (initially empty)', (done) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/users',
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(data)).toEqual([]);
        done();
      });
    });

    req.on('error', (e) => {
      done(e);
    });

    req.end();
  });

  it('should create a new user', (done) => {
    const postData = JSON.stringify({
      username: 'John Doe',
      age: 30,
      hobbies: ['reading', 'gaming']
    });

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        expect(res.statusCode).toBe(201);
        const responseBody = JSON.parse(data);
        expect(responseBody).toHaveProperty('id');
        userId = responseBody.id;
        done();
      });
    });

    req.on('error', (e) => {
      done(e);
    });

    req.write(postData);
    req.end();
  });

  it('should get the created user by ID', (done) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: `/api/users/${userId}`,
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        expect(res.statusCode).toBe(200);
        const responseBody = JSON.parse(data);
        expect(responseBody).toHaveProperty('id', userId);
        done();
      });
    });

    req.on('error', (e) => {
      done(e);
    });

    req.end();
  });

  it('should update the user', (done) => {
    const putData = JSON.stringify({
      username: 'Jane Doe',
      age: 25,
      hobbies: ['writing', 'traveling']
    });
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: `/api/users/${userId}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(putData)
      }
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        expect(res.statusCode).toBe(200);
        const responseBody = JSON.parse(data);
        expect(responseBody).toHaveProperty('username', 'Jane Doe');
        done();
      });
    });

    req.on('error', (e) => {
      done(e);
    });

    req.write(putData);
    req.end();
  });

  it('should delete the user', (done) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: `/api/users/${userId}`,
      method: 'DELETE',
    };

    const req = http.request(options, (res) => {
      expect(res.statusCode).toBe(204);
      done();
    });

    req.on('error', (e) => {
      done(e);
    });

    req.end();
  });

  it('should return 404 for deleted user', (done) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: `/api/users/${userId}`,
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        expect(res.statusCode).toBe(404);
        done();
      });
    });

    req.on('error', (e) => {
      done(e);
    });

    req.end();
  });
});
