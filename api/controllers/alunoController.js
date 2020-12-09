'use strict';

var mongoose = require('mongoose')
const Alunos = mongoose.model('alunos');

exports.findAll_alunos = (req, res) => {
    Alunos.find({})
        .then(resp => {
            res.status(200).json(resp)
        })
        .catch(err => {
            res.status(400).send(err)
        })
};

exports.create_alunos = (req, res) => {
    const new_aluno = new Alunos(req.body);
    new_aluno.save()
        .then(resp => {
            res.status(201).json(resp)
        })
};


exports.readOne_alunos = (req, res) => {
    Alunos.findById(req.params.alunoId)
        .then(resp => {
            res.status(200).json(resp)
        })
        .catch(err => {
            res.status(400).send(err)
        })
};


exports.update_alunos = (req, res) => {

    Alunos.findOneAndUpdate({ _id: req.params.alunoId }, req.body, { new: true, useFindAndModify: false })
        .then(resp => {
            res.status(200).json(resp)
        })
        .catch(err => {
            res.status(400).send(err)
        })
};


exports.delete_alunos = (req, res) => {
    Alunos.deleteOne({ _id: req.params.alunoId })
        .then(resp => {
            res.status(200).json({ message: 'Aluno successfully deleted', alunoId: req.params.alunoId })
        })
        .catch(err => {
            res.status(400).send(err)
        })
};

