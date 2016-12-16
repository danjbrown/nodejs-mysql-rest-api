var express = require('express');
var router = express.Router();

var User = require('../models/users.js');
var Response = require('../models/response.js');
var responseObject = new Response();

// POST: add a new user
router.post('/add', function (req, res) {
    // validate input using express-validator
    req.checkBody('username', 'Invalid user name').len(6, 50);
    req.checkBody('password', 'Invalid password').len(6, 20);
    var validationErrors = req.validationErrors();
    if (validationErrors) {
        res.writeHead(422, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(responseObject.create(validationErrors)));
    } else {
        var user = {
            'username': req.query.username,
            'password': req.query.password
        }

        var userObject = new User(true);
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
    var userObject = new User();
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
    var validationErrors = req.validationErrors();
    if (validationErrors) {
        res.writeHead(422, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(responseObject.create(validationErrors)));
    } else {
        var user = {
            "id": req.params.id,
            "username": req.query.username,
            "password": req.query.password
        }
        var userObject = new User(true);
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
    var validationErrors = req.validationErrors();
    if (validationErrors) {
        res.writeHead(422, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(responseObject.create(validationErrors)));
    } else {
        var userObject = new User(true);
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
    var validationErrors = req.validationErrors();
    if (validationErrors) {
        res.writeHead(422, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(responseObject.create(validationErrors)));
    } else {
        var userObject = new User(true);
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