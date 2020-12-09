const request = require('supertest')

const app = require('../server')

const dbHandler = require('./db-handler')

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

test('Deve listar todos alunos', () => {
    return request(app).get('/alunos')
        .then((res) => {
            expect(res.status).toBe(200)
        })
})

test('Deve criar um aluno', () => {
    return request(app).post('/alunos').send({ nome: 'Ada Lovelace', turma: '3B' })
        .then((res) => {
            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('nome', 'Ada Lovelace');
            expect(res.body).toHaveProperty('turma', '3B');
        })
})

test('Deve encontrar um aluno', async () => {
    const createdAluno = await request(app).post('/alunos').send({ nome: 'Ada Lovelace', turma:'3B' })
    expect(createdAluno.status).toBe(201)
    expect(createdAluno.body).toHaveProperty('_id')

    await request(app).get(`/alunos/${createdAluno.body._id}`)
        .then(resp => {
            expect(resp.status).toBe(200);
            expect(resp.body).toHaveProperty('_id')
            expect(resp.body).toHaveProperty('nome')
            expect(resp.body).toHaveProperty('turma')
        })
})

test('Deve alterar um aluno', async () => {
    const createdAluno = await request(app).post('/alunos').send({ nome: 'Ada Lovelace', turma:'3B' })
    expect(createdAluno.status).toBe(201)
    expect(createdAluno.body).toHaveProperty('_id')

    await request(app).put(`/alunos/${createdAluno.body._id}`).send({ nome: 'Steve Wozniak ', turma:'4C' })
        .then(resp => {
            expect(resp.status).toBe(200);
            expect(resp.body._id).toEqual(createdAluno.body._id)
            expect(resp.body).toHaveProperty('nome')
            expect(resp.body).toHaveProperty('turma')
        })
})

test('Deve deletar um aluno', async () => {
    const createdAluno = await request(app).post('/alunos').send({ nome: 'Ada Lovelace', turma:'3B' })
    expect(createdAluno.status).toBe(201)
    expect(createdAluno.body).toHaveProperty('_id')

    await request(app).delete(`/alunos/${createdAluno.body._id}`)
        .then(resp => {
            expect(resp.status).toBe(200);
            expect(resp.body.alunoId).toEqual(createdAluno.body._id)
            expect(resp.body).toHaveProperty('message', 'Aluno successfully deleted')
        })
})
