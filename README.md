# CRUD API

## Description
This project implements a simple CRUD API using an in-memory database. The API allows you to create, read, update, and delete user records.

## Technical Requirements
- Implemented using JavaScript or TypeScript
- Only the following dependencies are allowed: `nodemon`, `dotenv`, `cross-env`, `typescript`, `ts-node`, `ts-node-dev`, `eslint` and its plugins, `webpack-cli`, `webpack` and its plugins, `prettier`, `uuid`, `@types/*`, and libraries used for testing
- Node.js version 22.x.x (22.9.0 or higher)
- Prefer asynchronous API whenever possible

## Implementation Details
1. Implemented endpoint `api/users`:
    - **GET** `api/users` to get all users
    - **GET** `api/users/{userId}` to get a user by ID
    - **POST** `api/users` to create a new user
    - **PUT** `api/users/{userId}` to update an existing user
    - **DELETE** `api/users/{userId}` to delete an existing user
2. Users are stored as objects with the following properties:
    - `id` — unique identifier (`string`, `uuid`) generated on the server side
    - `username` — user's name (`string`, **required**)
    - `age` — user's age (`number`, **required**)
    - `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)
3. Requests to non-existing endpoints return a 404 status code with a human-friendly message
4. Server-side errors during request processing return a 500 status code with a human-friendly message
5. The port on which the application runs is stored in a `.env` file
6. Two modes of running the application:
    - Development mode using `nodemon` or `ts-node-dev` (`npm run start:dev`)
    - Production mode (`npm run start:prod`)
7. Tests for the API (at least 3 scenarios)
8. Horizontal scaling using the Node.js `Cluster` API with a load balancer that distributes requests using the Round-robin algorithm (`npm run start:multi`)

## Project Structure
crud-api/
├── src/
│   ├── controller/
│       └── userController.js
│   ├── service/
│       └── loadBalancer.js
│   ├── test/
│       └── user.test.js
│   └── utils/
│       ├── db.js
│       ├── router.js
│       └── server.js
├── .babelrc
├── .env
├── .gitignore
├── app.js
├── jest.config.js
├── multi.js
├── package.json


## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/crud-api.git
   cd crud-api```

2. Install dependencies:
   ```sh
   npm install```

3. Create a`.env` file in the root directory and add the following:
   ```sh
   PORT=3000```

## Running the Application

### Development Mode
To run the application in development mode with hot-reloading:
   `npm run start:dev`

### Production Mode
To run the application in production mode:
    `npm run start:prod`

### Multi-Instance Mode
To run the application with multiple instances using the Node.js `Cluster` API:
    `npm run start:multi`

## Using the API
### Endpoints
- GET `/api/users` - Get all users
- GET `/api/users/{userId}` - Get a user by ID
- POST `/api/users` - Create a new user
- PUT `/api/users/{userId}` - Update an existing user
- DELETE `/api/users/{userId}` - Delete an existing user

### Example Requests
Get All Users
    `curl -X GET http://localhost:3000/api/users`
Get User by ID
    `curl -X GET http://localhost:3000/api/users/{userId}`
Create a New User
    `curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d '{"username": "John Doe", "age": 30, "hobbies": ["reading", "gaming"]}'`
Update an Existing User
    `curl -X PUT http://localhost:3000/api/users/{userId} -H "Content-Type: application/json" -d '{"username": "John Doe", "age": 31, "hobbies": ["reading", "gaming", "hiking"]}'`
Delete a User
    `curl -X DELETE http://localhost:3000/api/users/{userId}`

## Testing
To run the tests:
    `npm test`

## Horizontal Scaling
When running in multi-instance mode, the load balancer listens on `localhost:3000/api` and distributes requests to worker instances on `localhost:3001/api`, `localhost:3002/api`, etc.

### Example Scenario
First `POST` request to `localhost:3001/api` creates a user
Second `GET` request to `localhost:3002/api` returns the created user
Third `DELETE` request to `localhost:3003/api` deletes the created user
Fourth `GET` request to `localhost:3001/api` returns a 404 status code for the deleted user

## License
This project is licensed under the MIT License.
