'use strict';

// global config
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

class Response {

    constructor() {
    }

    /*
    Function to create the REST API response
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