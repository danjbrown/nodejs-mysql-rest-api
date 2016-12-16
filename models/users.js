'use strict';

const fs = require("fs");
const mysql = require('mysql');
const crypto = require('crypto');

// global config
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

class Users {

    /**
     * Create a new user instance, open MySql connection if needed
     */
    constructor() {
        this._connection = mysql.createConnection(config.database);
        this._connection.connect();
    }

    /*
    Function to add a new user
     */
    addUser(user, callback) {

        let passwordMd5 = crypto.createHash('md5').update(user.password).digest('hex');

        let insert = {username: user.username, password: passwordMd5};
        this._connection.query('INSERT INTO users SET ?', insert, function (err, rows, fields) {
                if (err) {
                    return callback(err);
                }

                callback(null, rows);
            }
        );

        this._connection.end();
    }

    /*
    Function to update user details
     */
    updateUser(user, callback) {
    
    	let passwordMd5 = crypto.createHash('md5').update(user.password).digest('hex');

        let update = {username: user.username, password: passwordMd5};
        this._connection.query('UPDATE users SET ? WHERE id = ?', [update, user.id], function (err, rows, fields) {
                if (err) {
                    return callback(err);
                }

                callback(null, rows);
            }
        );

        this._connection.end();
    }

    /*
    Function to delete a user
     */
    deleteUser(id, callback) {

        this._connection.query('DELETE FROM users WHERE id = ?', id, function (err, rows, fields) {
                if (err) {
                    return callback(err);
                }

                callback(null, rows);
            }
        );

        this._connection.end();
    }

    /*
    Function to get details for a specific user
     */
    getUser(id, callback) {

        this._connection.query('SELECT id, username FROM users WHERE id = ?', id, function (err, rows, fields) {
                if (err) {
                    return callback(err);
                }

                callback(null, rows);
            }
        );

        this._connection.end();
    }

    /*
    Function to get all users; currently just reading from the file system
     */
    getAllUsers(callback) {

		this._connection.query('SELECT * FROM users', function (err, rows, fields) {
                if (err) {
                    return callback(err);
                }

                callback(null, rows);
            }
        );

        this._connection.end();
    }
}

module.exports = Users;