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
##