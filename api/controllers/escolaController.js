'use strict';

var mongoose = require('mongoose'),
  Escolas = mongoose.model('escolas');

exports.findAll_escolas = (req, res) => {
  Escolas.find({})
    .then(resp => {
      res.status(200).json(resp)
    })
    .catch(err => {
      res.status(400).send(err)
    })
};

exports.create_escolas = (req, res) => {
  const new_escola = new Escolas(req.body);

  new_escola.save()
    .then(resp => {
      res.status(201).json(resp)
    })
    .catch(err => {
      res.status(400).send(err)
    })
};


exports.readOne_escolas = (req, res) => {
  Escolas.findById(req.params.escolaId)
    .then(resp => {
      res.status(200).json(resp)
    })
    .then(err => {
      res.status(400).send(err)
    })
};

exports.update_escolas = (req, res) => {
  Escolas.findOneAndUpdate({ _id: req.params.escolaId }, req.body, { new: true, useFindAndModify: false })
    .then(resp => {
      res.status(200).json(resp)
    })
    .catch(err => {
      res.status(400).send(err)
    })
};

exports.delete_escolas = (req, res) => {
  Escolas.deleteOne({ _id: req.params.escolaId })
    .then(resp => {
      res.status(200).json({ message: 'Escola successfully deleted', escolaId: req.params.escolaId })
    })
    .catch(err => {
      res.status(400).send(err)
    })
};

