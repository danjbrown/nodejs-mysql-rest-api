var express = require('express');
var router = express.Router();

var User = require('../models/users.js');

// POST: add a new user
router.post('/add', function (req, res) {
    // validate input using express-validator
    req.checkBody('username', 'Invalid user name').len(6, 50);
    req.checkBody('password', 'Invalid password').len(6, 20);
    var validationErrors = req.validationErrors();
    if (validationErrors) {
        var data = {'error': 'invalid_params', 'error_messages': validationErrors};
        res.writeHead(422, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(data));
    } else {
        var user = {
            'username': req.query.username,
            'password': req.query.password
        }

        var userObject = new User(true);
        userObject.addUser(user, function (err, data) {
            if (err) {
                var err = {'error': 'database_error', 'error_messages': err};
                res.writeHead(500, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(err));
            } else {
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(data));
            }
        });
    }
})

// GET all users
router.get('/', function (req, res) {
    var userObject = new User();
    userObject.getAllUsers(function (err, data) {
        if (err) {
            var err = {'error': 'database_error', 'error_messages': err};
            res.writeHead(500, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(err));
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(data));
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
        var data = {'error': 'invalid_params', 'error_messages': validationErrors};
        res.writeHead(422, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(data));
    } else {
        var user = {
            "id": req.params.id,
            "username": req.query.username,
            "password": req.query.password
        }
        var userObject = new User(true);
        userObject.updateUser(user, function (err, data) {
            if (err) {
                var err = {'error': 'database_error', 'error_messages': err};
                res.writeHead(500, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(err));
            } else {
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(data));
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
        var errors = {'error': 'invalid_params', 'error_messages': validationErrors};
        res.writeHead(422, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(errors));
    } else {
        var userObject = new User(true);
        userObject.getUser(req.params.id, function (err, data) {
            if (err) {
                var err = {'error': 'database_error', 'error_messages': err};
                res.writeHead(500, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(err));
            } else {
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(data));
            }
        });
    }


})

// DELETE: remove a user
router.delete('/delete/:id', function (req, res) {
    req.checkParams("id", "Invalid user id").isInt();
    var validationErrors = req.validationErrors();
    if (validationErrors) {
        var data = {'error_code': 'invalid_params', 'error_messages': validationErrors};
        res.writeHead(422, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(data));
    } else {
        var userObject = new User(true);
        userObject.deleteUser(req.params.id, function (err, data) {
            if (err) {
                var err = {'error_code': 'database_error', 'error_messages': err};
                res.writeHead(500, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(err));
            } else {
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(data));
            }
        });
    }
})

module.exports = router;