const { app } = require("../app")
const request = require("supertest")
const { sequelize } = require("../models")
const { queryInterface } = sequelize
const bcrypt = require("bcryptjs")


afterAll((done) => {
    queryInterface.bulkDelete('Users')
        .then(() => {
            console.log('db restored')
            return done()
        })
        .catch(err => done(err))
})

const firstUser = {
    email: 'user@mail.com',
    password: '12345'
}



beforeAll(done => {
    const salt = bcrypt.genSaltSync(10)
    const firstUserHashedPassword = bcrypt.hashSync(firstUser.password, salt)
    queryInterface
        .bulkInsert('Users', [
            {
                email: firstUser.email,
                password: firstUserHashedPassword,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
        .then(() => {
            // console.log('New user created: ' + firstUser.email)
            return done()
        }).catch(err => done(err))
})

describe('User service', () => {
    describe('POST /register', () => {
        describe('success register', () => {
            test('This should return object with id and email and status 201', (done) => {
                const inputRegister = {
                    email: 'mymail@mail.com',
                    password: '$2y$12$x9jnH0PcnMUSo9t72GL/u.9z4mR8hWCoYJscgzHWMf5dhwl8Xfua.' //hashed from bcrypt-generator.com
                }
                request(app)
                    .post('/register')
                    .send(inputRegister)
                    .end((err, res) => {
                        if (err) {
                            return done(err)
                        } else {
                            expect(res.status).toBe(201)
                            expect(res.body).toHaveProperty('id', expect.any(Number))
                            expect(res.body).toHaveProperty('email', inputRegister.email)
                            expect(res.body).not.toHaveProperty('password')
                            return done()
                        }
                    })
            })
        })
        describe('error register', () => {
            test('should return error with status 400 because of email or password is missing', (done) => {
                const errors = [{
                    message: 'Password is required',
                    message: 'Email is required',
                }, {
                    message: 'Email is required',
                    message: 'Password is required'
                }
                ]
                const inputNull = {
                    email: null,
                    password: null
                }

                request(app)
                    .post('/register')
                    .send(inputNull)
                    .end((err, res) => {
                        if (err) {
                            console.log('ERROR', err)
                            return done(err)
                        } else {
                            const { body } = res
                            // console.log('INI', body)
                            expect(res.status).toBe(400)
                            expect(res.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })
            test('should send error and status 400 because password is empty string', done => {
                const userInput = {
                    email: '',
                    password: ''
                }
                const errors = [

                    {
                        message: 'Email must be not an empty string'
                    },
                    {
                        message: 'Password must be not an empty string'
                    }
                ]
                request(app)
                    .post('/register')
                    .send(userInput)
                    .end((err, res) => {
                        if (err) {
                            console.log('There is some error: ', err);
                            return done(err);
                        } else {
                            // console.log('INI EMPTY:', res.body)
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);
                            return done();
                        }
                    });
            })

        })
    })
    describe('POST /login', () => {
        describe('success login', () => {
            test('should return object with id, email and access_token with status 200', (done) => {
                const inputLogin = {
                    email: 'user@mail.com',
                    password: '12345'
                }
                request(app)
                    .post('/login')
                    .send(inputLogin)
                    .end((err, res) => {
                        if (err) {
                            return done(err)
                        } else {
                            expect(res.status).toBe(200)
                            expect(res.body).toHaveProperty('id', expect.any(Number))
                            expect(res.body).toHaveProperty('email', inputLogin.email)
                            expect(res.body).toHaveProperty('access_token', expect.any(String))
                            expect(res.body).not.toHaveProperty('password')
                            return done()
                        }
                    })
            })
        })
        describe('error invalid login', () => {
            test('should return error with status 400', done => {
                const invalidLogin = {
                    email: 'user@mail.com',
                    password: '1234'
                }
                const errorLogin = { msg: 'Invalid email/password', type: 'Bad Request' }
                request(app)
                    .post('/login')
                    .send(invalidLogin)
                    .end((err, res) => {
                        if (err) {
                            return done(err)
                        } else {
                            expect(res.status).toBe(400)
                            // console.log('INI', res.body)
                            expect(res.body).toHaveProperty('errors', errorLogin);
                            return done()
                        }
                    })
            })
        })
    })
})
