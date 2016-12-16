'use strict';

// global config
var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

class Response {

    constructor() {
    }

    /*
    Function to create a response
     */
    create(error, data) {
        if (error) {
            return {
                'meta': {
                    'status': 'error',
                    'message': error
                },
                'data': {}
            };
        } else {
            return {
                'meta': {
                    'status': 'ok',
                    'message': {}
                },
                'data': data
            };
        }
    }
}

module.exports = Response;