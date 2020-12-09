'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    usuario: {
        type: String,
        required: 'Enter the name of the user'
    },
    senha: {
        type: String,
        required: 'Enter the password of the user'
    },
    email: {
        type: String,
        required: 'Enter the email of the user'
    },
    Created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('users', TaskSchema);