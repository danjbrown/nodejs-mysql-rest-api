const express = require('express');
const router = express.Router();

const User = require('../models/users.js');
const Response = require('../models/response.js');
const responseObject = new Response();

// POST: add a new user
router.post('/add', function (req, res) {
    // validate input using express-validator
    req.checkBody('username', 'Invalid user name').len(6, 50);
    req.checkBody('password', 'Invalid password').len(6, 20);
    let validationErrors = req.validationErrors();
    if (validationErrors) {
        res.writeHead(422, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(responseObject.create(validationErrors)));
    } else {
        let user = {
            'username': req.query.username,
            'password': req.query.password
        }

        const userObject = new User(true);
        userObject.addUser(user, function (err, data) {
            if (err) {
                res.writeHead(500, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(responseObject.create(err)));
            } else {
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(responseObject.create(null, data)));
            }
        });
    }
})

// GET all users
router.get('/', function (req, res) {
    const userObject = new User();
    userObject.getAllUsers(function (err, data) {
        if (err) {
            res.writeHead(500, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(responseObject.create(err)));
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(responseObject.create(null, data)));
        }
    });
})

// PUT: update an existing user
router.put('/update/:id', function (req, res) {
    // validate input using express-validator
    req.checkBody("username", "Invalid username").len(6, 20);
    req.checkBody('password', 'Invalid password').len(6, 20);
    req.checkParams("id", "Invalid user id").isInt();
    let validationErrors = req.validationErrors();
    if (validationErrors) {
        res.writeHead(422, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(responseObject.create(validationErrors)));
    } else {
        let user = {
            "id": req.params.id,
            "username": req.query.username,
            "password": req.query.password
        }
        const userObject = new User(true);
        userObject.updateUser(user, function (err, data) {
            if (err) {
                res.writeHead(500, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(responseObject.create(err)));
            } else {
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(responseObject.create(null, data)));
            }
        });
    }
})

// GET: get user details
router.get('/:id', function (req, res) {
    // validate input using express-validator
    req.checkParams("id", "Invalid user id").isInt();
    let validationErrors = req.validationErrors();
    if (validationErrors) {
        res.writeHead(422, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(responseObject.create(validationErrors)));
    } else {
        const userObject = new User(true);
        userObject.getUser(req.params.id, function (err, data) {
            if (err) {
                res.writeHead(500, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(responseObject.create(err)));
            } else {
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(responseObject.create(null, data)));
            }
        });
    }


})

// DELETE: remove a user
router.delete('/delete/:id', function (req, res) {
    req.checkParams("id", "Invalid user id").isInt();
    let validationErrors = req.validationErrors();
    if (validationErrors) {
        res.writeHead(422, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(responseObject.create(validationErrors)));
    } else {
        const userObject = new User(true);
        userObject.deleteUser(req.params.id, function (err, data) {
            if (err) {
                var err = {'error_code': 'database_error', 'error_messages': err};
                res.writeHead(500, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(responseObject.create(err)));
            } else {
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(responseObject.create(null, data)));
            }
        });
    }
})

module.exports = router;