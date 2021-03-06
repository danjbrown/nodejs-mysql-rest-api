# nodejs-mysql-rest-api
NodeJS MySql REST API

## Overview

This is a NodeJS RESTful API designed to communicate with a MySql database:

 * It is a stateless API that exposes directory like URIs, for example /users/delete/1.
 * The API uses the HTTP methods GET, PUT, UPDATE and DELETE.
 * It returns JSON data describing any errors, status or data returned by the service.
 * The sample code manipulates users in a MySql database but could be used as a skeleton for other purposes. Please adjust as necessary for your database structure.
 * Example parameters for the MySql connection are provided in a separate configuration file /models/config.js.
 * The code uses ECMAScript 6 standards including classes, therefore please run it using the latest version of NodeJS.

Features
 * nodemon, a script monitor that watches for code changes and restarts the application.

### Usage

Clone or download the repository.

Install the application

 ```
 npm install
 ```

Run the application, using nodemon

 ```
 node start
 ```

###RESTful API Specification

The services are available at [http://localhost:3000](http://localhost:3000)

1. GET: Retrieve all users<br />
/users

2. GET: Retrieve details for a single user<br />
/users/:id<br />
param: user id

3. POST: Create a new user<br />
/users/add<br />
param: username<br />
param: password

4. PUT: Update a user<br />
/users/delete/:id<br />
param: user id

Response format

 ```
{
    'meta': {
        'status': 'error/ok',
        'message': {error_message}
    },
    'data': {data}
}
 ```
