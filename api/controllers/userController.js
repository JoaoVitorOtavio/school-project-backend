'use strict';

const bcrypt = require('bcrypt');
var jwt = require('jwt-simple');

// this needs to be on .env, but its just to do more fast
var secret = 'happylife';

var mongoose = require('mongoose'),
    User = mongoose.model('users');

exports.create_user = async (req, res) => {
    const user = await User.findOne({ usuario: req.body.usuario })
    if (user) {
        return res.status(400).json({ message: 'User already exist.' })
    }
    const salt = bcrypt.genSaltSync(1)
    const senha = bcrypt.hashSync(req.body.senha, salt);
    const values = { ...req.body, senha }
    const new_user = new User(values);
    new_user.save(values)
        .then(resp => {
            res.status(201).json(resp)
        })
        .catch(err => {
            res.status(400).send(err)
        })
};

exports.singin_user = async (req, res) => {
    const user = await User.findOne({ usuario: req.body.usuario })

    if (!user) {
        return res.status(400).json({ message: 'User doesnt exist.' })
    }

    const isValidPassword = await bcrypt.compare(req.body.senha, user.senha);

    if (!isValidPassword) {
        return res.status(400).json({ message: 'Wrong password' })
    }

    const result = { ...user.toJSON(), senha: undefined }

    const token = jwt.encode(result, secret);
    res.status(200).json({ user: result, token })
}


