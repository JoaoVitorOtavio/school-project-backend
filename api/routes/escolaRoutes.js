'use strict';
module.exports = function(app) {
  var escolaController = require('../controllers/escolaController');

  // todoList Routes
  app.route('/escolas')
    .get(escolaController.findAll_escolas)
    .post(escolaController.create_escolas);


  app.route('/escolas/:escolaId')
    .get(escolaController.readOne_escolas)
    .put(escolaController.update_escolas)
    .delete(escolaController.delete_escolas);
};
