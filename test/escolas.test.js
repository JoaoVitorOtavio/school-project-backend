const request = require('supertest')

const app = require('../server')

const dbHandler = require('./db-handler')

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

test('Deve listar todas escolas', () => {
    return request(app).get('/escolas')
        .then((res) => {
            expect(res.status).toBe(200)
        })
})

test('Deve criar uma escola', () => {
    return request(app).post('/escolas').send({ nome: 'Escola De Bruxaria', cnpj: '999999' })
        .then((res) => {
            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('nome', 'Escola De Bruxaria');
            expect(res.body).toHaveProperty('cnpj', 999999);
        })
})

test('Deve encontrar uma escola', async () => {
    const createdEscola = await request(app).post('/escolas').send({ nome: 'Escola De Bruxaria', cnpj: '999999' })
    expect(createdEscola.status).toBe(201)
    expect(createdEscola.body).toHaveProperty('_id')

    await request(app).get(`/escolas/${createdEscola.body._id}`)
        .then(resp => {
            expect(resp.status).toBe(200);
            expect(resp.body).toHaveProperty('_id')
            expect(resp.body).toHaveProperty('nome')
            expect(resp.body).toHaveProperty('cnpj')
        })
})

test('Deve alterar uma escola', async () => {
    const createdEscola = await request(app).post('/escolas').send({ nome: 'Escola De Bruxaria', cnpj: '999999' })
    expect(createdEscola.status).toBe(201)
    expect(createdEscola.body).toHaveProperty('_id')

    await request(app).put(`/escolas/${createdEscola.body._id}`).send({ nome: 'Escola De Hogwarts', cnpj: '999999' })
        .then(resp => {
            expect(resp.status).toBe(200);
            expect(resp.body._id).toEqual(createdEscola.body._id)
            expect(resp.body).toHaveProperty('nome')
            expect(resp.body).toHaveProperty('cnpj')
        })
})

test('Deve deletar uma escola', async () => {
    const createdEscola = await request(app).post('/escolas').send({ nome: 'Escola De Bruxaria', cnpj: '999999' })
    expect(createdEscola.status).toBe(201)
    expect(createdEscola.body).toHaveProperty('_id')

    await request(app).delete(`/escolas/${createdEscola.body._id}`)
        .then(resp => {
            expect(resp.status).toBe(200);
            expect(resp.body.escolaId).toEqual(createdEscola.body._id)
            expect(resp.body).toHaveProperty('message', 'Escola successfully deleted')
        })
})
