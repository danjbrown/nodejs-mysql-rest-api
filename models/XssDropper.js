'use strict';

class XssDropper {

    /**
     * Create a new instance of the XSS dropper
     */
    constructor() {
    }

    /**
     * Function to check a string against a list of invalid chars
     *
     * @param {val} string
     * @returns {boolean}
     */
    static isValid(val) {
        var regExp = new RegExp("[\\[\\]@~%$£*^()'\",`]");
        if (regExp.exec(val) != null) {
            return false;
        }

        return true;
    }
}

module.exports = XssDropper;