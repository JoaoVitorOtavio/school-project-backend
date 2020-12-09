'use strict';

var mongoose = require('mongoose'),
  Turmas = mongoose.model('turmas');

exports.findAll_turmas = (req, res) => {
  Turmas.find({})
    .then(resp => {
      res.status(200).json(resp)
    })
    .catch(err => {
      res.status(400).send(err)
    })
};

exports.create_turmas = (req, res) => {
  var new_turma = new Turmas(req.body);
  new_turma.save()
    .then(resp => {
      res.status(201).json(resp)
    })
    .catch(err => {
      res.status(400).send(err)
    })
};


exports.readOne_turmas = (req, res) => {
  // console.log("BATEU NO READ ONE TURMAS", req.params.turmaId)
  Turmas.findById(req.params.turmaId)
    .then(resp => {
      res.status(200).json(resp)
    })
    .catch(err => {
      // console.log("BATEU NO READ ONE TURMAS ERRR", err)
      res.status(400).send(err)
    })
};


exports.update_turmas = (req, res) => {
  Turmas.findOneAndUpdate({ _id: req.params.turmaId }, req.body, { new: true, useFindAndModify: false })
    .then(resp => {
      res.status(200).json(resp)
    })
    .catch(err => {
      res.status(400).send(err)
    })
};


exports.delete_turmas = (req, res) => {
  Turmas.deleteOne({ _id: req.params.turmaId })
    .then(resp => {
      res.status(200).json({ message: 'Turma successfully deleted', turmaId: req.params.turmaId })
    })
    .catch(err => {
      res.status(400).send(err)
    })
};

