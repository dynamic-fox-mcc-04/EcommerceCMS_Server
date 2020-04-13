const app = require('../app');
const request = require('supertest');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const { encrypt } = require('../helpers/bcrypt');

const dummyUser = {
    username: 'qweqwe',
    email: 'mail100@mail.com',
    password: 'qweqwe'
}


afterAll((done) => {
    queryInterface.bulkDelete('Users')
        .then(() => {
            console.log('DB clean up')
            done()
        })
        .catch(err => {
            done(err)
        })
})

beforeAll((done) => {
    const hashPassword = encrypt(dummyUser.password);
    queryInterface.bulkInsert('Users', [
        {
            username: dummyUser.username,
            email: dummyUser.email,
            password: hashPassword,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ])
        .then(() => {
            done()
        })
        .catch(err => {
            done(err)
        })
})

describe('User service', () => {
    describe('POST /register', () => {
        describe('Success register ', () => {
            test('should return object with id username email and status 201', done => {
                const userInput = {
                    username: 'qwoqwo',
                    email: 'mail@mail.com',
                    password: 'qweqwe'
                }
                request(app)
                    .post('/register')
                    .send(userInput)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(201)
                            expect(response.body).toHaveProperty('id', expect.any(Number))
                            expect(response.body).toHaveProperty('username', userInput.username)
                            expect(response.body).toHaveProperty('email', userInput.email)
                            expect(response.body).not.toHaveProperty('password')
                            return done()
                        }
                    })
            })
        })
        describe('error register', () => {
            test('should return error with status 400 because missing email or password', (done) => {
                const errors = [
                    {
                        message: 'Username is required field'
                    },
                    {
                        message: 'Email is required field'
                    },
                    {
                        message: 'Password is required field'
                    }
                ]
                request(app)
                    .post('/register')
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(400)
                            expect(response.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })
            test('should return error with status 400 because email unique', (done) => {
                const errors = [{
                    message: 'Email already exists'
                }]
                request(app)
                    .post('/register')
                    .send(dummyUser)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(400)
                            expect(response.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })
            test('should return error with status 400 because username less than 4 characters', (done) => {
                const errors = [{
                    message: 'Username length must be at least 4 characters'
                }]
                const user1 = {
                    username: 'qwe',
                    email: 'mail10@mail.com',
                    password: 'qweqwe'
                }
                request(app)
                    .post('/register')
                    .send(user1)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(400)
                            expect(response.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })
            test('should return error with status 400 because password less than 6 characters', (done) => {
                const errors = [{
                    message: 'Password must be atleast has 6 characters'
                }]
                const user1 = {
                    username: 'qweqwe',
                    email: 'mail10@mail.com',
                    password: 'qwe'
                }
                request(app)
                    .post('/register')
                    .send(user1)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(400)
                            expect(response.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })
        })
    });
    describe('POST /login', () => {
        describe('success login', () => {
            test('should return object with id and email and status 200', done => {
                request(app)
                    .post('/login')
                    .send(dummyUser)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(200)
                            expect(response.body).toHaveProperty('token', expect.any(String))
                            return done()
                        }
                    })
            })
        })
    })
})