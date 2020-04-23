const app = require('../app')
const request = require('supertest')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { encryptPass } = require('../helpers/bcrypt')

const user = {
    email:'success@mail.com',
    password: 'success',
    role: 'admin'
}
const hashedPass = encryptPass(user.password)

const hashed = {
    email: user.email,
    password: hashedPass
}

const dummyUser = {
    email: 'dummy@mail.com',
    password: '123',
    role: 'admin'
}

const notAdmin = {
    email: 'notAdmin@mail.com',
    password: '123',
    role: 'civilian'
}

let token = ''

afterAll( done => {
    queryInterface.bulkDelete('Users')
        .then( () => {
            console.log('Users cleaned...')
            return done()
        })
        .catch( err => {
            return done(err)
        })
})

beforeAll( done => {
    const hashedPass = encryptPass(dummyUser.password)

    queryInterface.bulkInsert('Users', [{
        email: dummyUser.email,
        password: hashedPass,
        role: dummyUser.role,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        email: 'double@mail.com',
        password: hashedPass,
        role: dummyUser.role,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        email: 'notAdmin@mail.com',
        password: hashedPass,
        role: notAdmin.role,
        createdAt: new Date(),
        updatedAt: new Date()
    }])
        .then( () => {
            console.log('Dummy User Created: ', dummyUser.email)
            return done()
        })
        .catch( err => {
            return done(err)
        })
})

describe('User Service', () => {
    describe('POST /users/register', () => {
        describe('Successful Register', () => {
            test('should return object with status 201 and id and email', (done) => {
                request(app)
                    .post('/users/register')
                    .send(hashed)
                    .end((err, res) => {
                        if (err) {
                            console.log(err)
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
        describe('Failed Register', () => {
            test('should return error with status 400 because email and password is null', (done) => {
                const errors = [{
                    message: 'Email cannot be null'
                }, {
                    message: 'Password cannot be null'
                }]
                request(app)
                    .post('/users/register')
                    .end((err, res) => {
                        if (err) {
                            console.log(err)
                            return done(err)
                        } else {
                            expect(res.status).toBe(400)
                            expect(res.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })
            test('should return error with status 400 because email and password is empty string', (done) => {
                const errors = [{
                    message: 'Email cannot be empty string'
                },
                {
                    message: 'Please enter correct email format'
                }, 
                {
                    message: 'Password cannot be empty string'
                }]
                request(app)
                    .post('/users/register')
                    .send({
                        email: "",
                        password: ""
                    })
                    .end((err, res) => {
                        if (err) {
                            console.log(err)
                            return done(err)
                        } else {
                            expect(res.status).toBe(400)
                            expect(res.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })
            test('should return error with status 400 because email format is wrong', (done) => {
                const errors = [{
                    message: 'Please enter correct email format'
                }]
                request(app)
                    .post('/users/register')
                    .send({
                        email: "email",
                        password: "123"
                    })
                    .end((err, res) => {
                        if (err) {
                            console.log(err)
                            return done(err)
                        } else {
                            expect(res.status).toBe(400)
                            expect(res.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })
            test('should return error with status 400 because email not unique', done => {
                const errors = [{ message: "Email already exists" }]
                request(app)
                    .post('/users/register')
                    .send(dummyUser)
                    .end((err, res) => {
                        if (err) {
                            console.log(err)
                            return done(err)
                        } else {
                            expect(res.status).toBe(400)
                            expect(res.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })
        })
    })
    describe('POST /users/login', () => {
        describe('Successful Login', () => {
            test('should return object with status 200 and token', done => {
                request(app)
                    .post('/users/login')
                    .send(dummyUser)
                    .end((err, res) => {
                        if (err) {
                            console.log(err)
                            return done(err)
                        } else {
                            expect(res.status).toBe(200)
                            expect(res.body).toHaveProperty('access_token', expect.any(String))
                            expect(res.body).not.toHaveProperty('password')
                            // Set Token For FindAll Testing
                            token = res.body.access_token
                            return done()
                        }
                    })
            })
        })
        describe('Failed Login', () => {
            test('should return error with status 400 because email and password is null', (done) => {
                request(app)
                    .post('/users/login')
                    .end((err, res) => {
                        if (err) {
                            console.log(err)
                            return done(err)
                        } else {
                            expect(res.status).toBe(500)
                            expect(res.body).toMatchObject({})
                            return done()
                        }
                    })
            })
            test('should return error with status 401 because user is not admin', (done) => {
                const errors = [{
                    message: 'Only admin is authorized'
                }]
                request(app)
                    .post('/users/login')
                    .send({
                        email: "",
                        password: ""
                    })
                    .end((err, res) => {
                        if (err) {
                            console.log(err)
                            return done(err)
                        } else {
                            expect(res.status).toBe(401)
                            expect(res.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })
            test('should return error with status 400 because invalid email / password', (done) => {
                const errors = [{
                    message: 'Invalid email / password'
                }]
                const testDoubleUser = {
                    email: 'double@mail.com',
                    password: '123456'
                }
                request(app)
                    .post('/users/login')
                    .send(testDoubleUser)
                    .end((err, res) => {
                        if (err) {
                            console.log(err)
                            return done(err)
                        } else {
                            expect(res.status).toBe(400)
                            expect(res.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })
        })
    })
    describe('GET /users', () => {
        describe('Successful FindAll', () => {
            test('should return object with status 200 and all users', done => {
                request(app)
                    .get('/users')
                    .set('access_token', token)
                    .end((err, res) => {
                        if (err) {
                            console.log(err)
                            return done(err)
                        } else {
                            expect(res.status).toBe(200)
                            expect(res.body.result).toEqual(expect.any(Array))
                            return done()
                        }
                    })
            })
        })
    })
})