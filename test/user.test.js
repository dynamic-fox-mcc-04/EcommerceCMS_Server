const app = require('../app')
const request = require('supertest')

describe('User Service', () => {
    describe('POST /register', () => {
        describe('Successful Register', () => {
            test('should return object with id and email and status 201', (done) => {
                request(app)
                const userSuccess = {
                    email: 'success@mail.com',
                    password: 'success'
                }
                    .post('/users/register')
                    .send(userSuccess)
                    .end((err, res) => {
                        if (err) {
                            return done(err)
                        } else {
                            expect(res.status).toBe(201)
                            expect(res.body).toHaveProperty('id', expect.any(Number))
                            expect(res.body).not.toHaveProperty('password')
                            return done()
                        }
                    })
            })
        })
    })
})