const request = require('supertest')

const app = require('../server')

const dbHandler = require('./db-handler')

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

test('Deve listar todas turmas', () => {
    return request(app).get('/turmas')
        .then((res) => {
            expect(res.status).toBe(200)
        })
})

test('Deve criar uma turma', () => {
    return request(app).post('/turmas').send({ nome: 'Turma do pagode' })
        .then((res) => {
            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('nome', 'Turma do pagode');
        })
})

test('Deve encontrar uma turma', async () => {
    const createdTurma = await request(app).post('/turmas').send({ nome: 'Turma do pagode' })
    expect(createdTurma.status).toBe(201)
    expect(createdTurma.body).toHaveProperty('_id')

    await request(app).get(`/turmas/${createdTurma.body._id}`)
        .then(resp => {
            expect(resp.status).toBe(200);
            expect(resp.body).toHaveProperty('_id')
            expect(resp.body).toHaveProperty('nome')
        })
})

test('Deve alterar uma turma', async () => {
    const createdTurma = await request(app).post('/turmas').send({ nome: 'Turma do pagode' })
    expect(createdTurma.status).toBe(201)
    expect(createdTurma.body).toHaveProperty('_id')

    await request(app).put(`/turmas/${createdTurma.body._id}`).send({ nome: 'Turma Da Monica' })
        .then(resp => {
            expect(resp.status).toBe(200);
            expect(resp.body._id).toEqual(createdTurma.body._id)
            expect(resp.body).toHaveProperty('nome')
        })
})

test('Deve deletar uma turma', async () => {
    const createdTurma = await request(app).post('/turmas').send({ nome: 'Turma do pagode' })
    expect(createdTurma.status).toBe(201)
    expect(createdTurma.body).toHaveProperty('_id')

    await request(app).delete(`/turmas/${createdTurma.body._id}`)
        .then(resp => {
            expect(resp.status).toBe(200);
            expect(resp.body.turmaId).toEqual(createdTurma.body._id)
            expect(resp.body).toHaveProperty('message', 'Turma successfully deleted')
        })
})
