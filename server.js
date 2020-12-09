var cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./api/documentation/SchoolProject.postman_collection.json-Swagger20.json');

const Alunos = require('./api/models/alunoModel')
const Escolas = require('./api/models/escolaModel')
const Turmas = require('./api/models/turmaModel')
const User = require('./api/models/userModel')

const routes = require('./api/routes')

const app = express()
const port = 3333


// mongoose instance connection url connection
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


routes(app);
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, async () => {
    mongoose.connect("mongodb://localhost/SchoolProject", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('todo list RESTful API server started on: ' + port);
  })
};

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

module.exports = app