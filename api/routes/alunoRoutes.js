'use strict';
module.exports = function (app) {
  var alunoController = require('../controllers/alunoController');

  // todoList Routes
  app.route('/alunos')
    .get(alunoController.findAll_alunos)
    .post(alunoController.create_alunos);


  app.route('/alunos/:alunoId')
    .get(alunoController.readOne_alunos)
    .put(alunoController.update_alunos)
    .delete(alunoController.delete_alunos);
};
