# User Management
This project contains a Server side project (NodeJS, Typescript, Sequelize) and a Client side project (NodeJS, Typescript, React)

# Dependencies
To run this app locally you will need a few things:
- NodeJS >= v14
- This app use default **environment variables** which define in *utils/config.ts* file in both server and ui folders.

# Getting started
- Install dependencies (for server & ui)
```
cd <project>/server
npm install
```
```
cd <project>/ui
npm install
```
- Run the server
```
npm start
npm run start:dev (for develpment)
```
- Run the UI
```
npm start
```
- Run System Tests (server side - using mocha and chai)
```
npm test
```

# Assumptions
- The Database (SQLite) implmented as Sequelize and do not save the data after server is down.

# High Level Structure
- The client side has Register, Login and Home pages.
- After registraion and login the user will be able to display list of all users (with pagination);

- The server has 3 routes:
    - /register (post)
    - /login (post)
    - /users (post)

- The client will pass the user's password with JWT.
- The server will returns token (JWT) as access token for a pre define time.
- The client will use the token to access GET /users

# Improvement
- Server
    - Split the server to a GATEWAY & SERVICE
    - Use GATEWAY for /register and /login
    - Use SERVICE to store users resources.
    - Fetch users from DB without their password.
    - Index the DB by email for search improvements.

- Client
    - Alert explanaition when some register/login fields are invalid
    - Pagination improvements in **get all users**
    - Obviously, better UI will help here
- Both
    - Use **https** or other secure network to pass the JWT
    - Use dotenv to use **env vars** properly
##