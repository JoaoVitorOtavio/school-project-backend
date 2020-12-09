'use strict';
module.exports = (app) => {
    var userController = require('../controllers/userController');

    app.route('/user')
        .post(userController.create_user);

    app.route('/signin')
        .post(userController.singin_user);
};
