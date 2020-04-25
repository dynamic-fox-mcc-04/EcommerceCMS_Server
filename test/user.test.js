const app = require('../app.js')
const request = require('supertest')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { encryptPassword } = require('../helpers/bcrypt.js')

const dummyUser = {
    username: 'rina',
    email: 'mail@mail.com',
    password: '12341234',
    role: 'admin'
}
afterAll((done) => {
    queryInterface.bulkDelete('Users')
        .then(() => {
            console.log(`Db clean up`)
            done()
        })
        .catch(err => {
            done(err)
        })
})

beforeAll((done) => {
    queryInterface.bulkInsert('Users', [{
            username: dummyUser.username,
            email: dummyUser.email,
            password: encryptPassword(dummyUser.password),
            role: dummyUser.role,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {})
        .then(result => {
            console.log('User created: ' + dummyUser.email)
            done()
        })
        .catch(err => {
            done(err)
        })
})

describe('user service', () => {
    describe('POST /register', () => {
        describe('success register', () => {
            test('should return object with id and email and status 201', done => {
                const exampleAccount = {
                    username: 'bill',
                    email: 'cust@mail.com',
                    password: '12341234',
                    role: 'customer'
                }
                request(app)
                    .post('/users/register')
                    .send(exampleAccount)
                    .end((err, response) => {
                        if (err) {
                            // console.log(err)
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(201)
                            expect(response.body).toHaveProperty('id', expect.any(Number))
                            expect(response.body).toHaveProperty('email', exampleAccount.email)
                            expect(response.body).not.toHaveProperty('password')
                            return done()
                        }
                    })
            })
        })
        describe('error register', () => {
            test('should return error with status code 400 because missing email', done => {
                const missingemail = {...dummyUser }
                delete missingemail.email
                const errors = [{
                    message: 'email is required'
                }]
                request(app)
                    .post('/users/register')
                    .send(missingemail)
                    .end((err, response) => {
                        if (err) {
                            // console.log(err)
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(400)
                            expect(response.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })
        })
        describe('error register', () => {
            test('should return error with status code 400 because missing password', done => {
                const missingpassword = {...dummyUser }
                delete missingpassword.password
                const errors = [{
                    message: 'password is required'
                }]
                request(app)
                    .post('/users/register')
                    .send(missingpassword)
                    .end((err, response) => {
                        if (err) {
                            // console.log(err)
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(400)
                            expect(response.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })
        })
        describe('error register', () => {
            test('should return error with status code 400 because missing username', done => {
                const missingusername = {...dummyUser }
                delete missingusername.username
                const errors = [{
                    message: 'username is required'
                }]
                request(app)
                    .post('/users/register')
                    .send(missingusername)
                    .end((err, response) => {
                        if (err) {
                            // console.log(err)
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(400)
                            expect(response.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })
        })
        // describe('error register', () => {
        //     test('should return error with status code 400 because missing role', done => {
        //         const missingrole = {...dummyUser }
        //         delete missingrole.role
        //         const errors = [{
        //             message: 'role is required'
        //         }]
        //         request(app)
        //             .post('/users/register')
        //             .send(missingrole)
        //             .end((err, response) => {
        //                 if (err) {
        //                     // console.log(err)
        //                     return done(err)
        //                 } else {
        //                     // console.log(response.body)
        //                     expect(response.status).toBe(400)
        //                     expect(response.body).toHaveProperty('errors', errors)
        //                     return done()
        //                 }
        //             })
        //     })
        // })
        describe('error register', () => {
            test('should return error with status code 400 because missing username, email, password, role', done => {
                const errors = [{
                        message: 'username is required'
                    },
                    {
                        message: 'email is required'
                    },
                    {
                        message: 'password is required'
                    }
                ]
                request(app)
                    .post('/users/register')
                    .end((err, response) => {
                        if (err) {
                            // console.log(err)
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(400)
                            expect(response.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })
        })
        describe('error register', () => {
            test('should return error with status code 400 because email must be unique', done => {
                const userInput = {
                    username: 'jojo',
                    email: 'mail@mail.com',
                    password: '12345678',
                    role: 'admin'
                }
                const errors = [{
                    message: 'email is already exists'
                }]
                request(app)
                    .post('/users/register')
                    .send(userInput)
                    .end((err, response) => {
                        if (err) {
                            // console.log(err)
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(400)
                            expect(response.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })
        })
        describe('error register', () => {
            test('should return error with status code 400 because password length is < 6', done => {
                const userInput = {
                    username: 'jojo',
                    email: 'mail@mail.com',
                    password: '1234',
                    role: 'admin'
                }
                const errors = [{
                    message: 'Password atleast has 6 characters'
                }]
                request(app)
                    .post('/users/register')
                    .send(userInput)
                    .end((err, response) => {
                        if (err) {
                            // console.log(err)
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(400)
                            expect(response.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })
        })
    })
    describe('POST /login', () => {
        describe('success login', () => {
            test('should return object with properties access token, id, email and status code 200', done => {
                const inputUser = {
                    email: 'mail@mail.com',
                    password: '12341234'
                }
                request(app)
                    .post('/users/login')
                    .send(inputUser)
                    .end((err, response) => {
                        if (err) {
                            // console.log(err)
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(200)
                            expect(response.body).toHaveProperty('email', inputUser.email)
                            expect(response.body).toHaveProperty('token', expect.any(String))
                            expect(response.body).not.toHaveProperty('password')
                            return done()
                        }
                    })
            })

        })
        describe('error login', () => {
            test('should return error with status code 401 because invalid email', done => {
                const inputUser = {
                    email: 'coba@mail.com',
                    password: 'qwertyuiop'
                }
                const errors = [{
                    message: 'email/password is wrong'
                }]
                request(app)
                    .post('/users/login')
                    .send(inputUser)
                    .end((err, response) => {
                        if (err) {
                            // console.log(err)
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(404)
                            expect(response.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })

        })
        describe('error login', () => {
            test('should return error with status code 401 because invalid password', done => {
                const inputUser = {
                    email: 'mail@mail.com',
                    password: 'qwertyuiop'
                }
                const errors = [{
                    message: 'email/password is wrong'
                }]
                request(app)
                    .post('/users/login')
                    .send(inputUser)
                    .end((err, response) => {
                        if (err) {
                            // console.log(err)
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(404)
                            expect(response.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })

        })
    })
})