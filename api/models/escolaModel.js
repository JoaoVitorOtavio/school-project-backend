'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    nome: {
        type: String,
        required: 'Enter the name of the school'
    },
    cnpj: {
        type: Number,
        required: 'Enter the cnpj of the school'
    },
    Created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('escolas', TaskSchema);