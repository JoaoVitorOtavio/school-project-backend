const request = require('supertest')

const app = require('../server')

const dbHandler = require('./db-handler')

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

test('Deve criar um usuario', () => {
    return request(app).post('/user').send({ usuario: 'harry', senha: '123123', email: 'harry@mail.com' })
        .then((res) => {
            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('usuario', 'harry');
            expect(res.body).toHaveProperty('email', 'harry@mail.com');
        })
})

test('Deve fazer o signin', async () => {
    const createdUser = await request(app).post('/user').send({ usuario: 'harry', senha: '123123', email: 'harry@mail.com' })
    expect(createdUser.status).toBe(201)
    expect(createdUser.body).toHaveProperty('_id');

    await request(app).post(`/signin`).send({ usuario: 'harry', senha: '123123' })
        .then(resp => {
            expect(resp.status).toBe(200);
            expect(resp.body).toHaveProperty('token')
            expect(resp.body).toHaveProperty('user')
            expect(resp.body.user).toHaveProperty('senha', undefined)
        })
})
