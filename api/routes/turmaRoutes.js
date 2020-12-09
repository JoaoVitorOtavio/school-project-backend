'use strict';
module.exports = function(app) {
  var turmasController = require('../controllers/turmaController');

  // todoList Routes
  app.route('/turmas')
    .get(turmasController.findAll_turmas)
    .post(turmasController.create_turmas);


  app.route('/turmas/:turmaId')
    .get(turmasController.readOne_turmas)
    .put(turmasController.update_turmas)
    .delete(turmasController.delete_turmas);
};
