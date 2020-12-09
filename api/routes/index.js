const alunoRoutes = require('./alunoRoutes')
const escolaRoutes = require('./escolaRoutes')
const turmaRoutes = require('./turmaRoutes')
const userRoutes = require('./userRoutes')

module.exports = (app) => {
    alunoRoutes(app)
    escolaRoutes(app)
    turmaRoutes(app)
    userRoutes(app)
}
