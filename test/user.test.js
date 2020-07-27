const request = require('supertest')
const sum = require('../sum');
const app = require('../app.js')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize
const { hashPassword } = require('../helpers/bcrypt')

const admin = {
    email: 'admin@mail.com',
    password: 'mushroom',
    role: 'superadmin'
};

afterAll(done => {
    queryInterface
        .bulkDelete('Users')
        .then(() => {
            console.log('Db clean up... ');
            done();
        })
        .catch(err => {
            console.log(err);
            done(err);
        });
});
  
beforeAll(done => {
    const passwordHashed = hashPassword(admin.password)
    queryInterface
        .bulkInsert('Users', [
            {
                email: admin.email,
                password: passwordHashed,
                role: admin.role,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
        .then(() => {
            console.log('Super admin created: ' + admin.email);
            done();
        })
        .catch(err => {
            done(err);
        });
});

const userInput = {
    email: 'fadhil@mail.com',
    password: 'fadhilman',
    role: 'admin'
};

describe('User service', () => {
    describe('POST /register', () => {
        describe('Register - success', () => {
            test('Should return id, email, and role with status 201', done => {
                request(app)
                    .post('/register')
                    .send(userInput)
                    .end((err, response) => {
                    if (err) {
                        console.log('Error testing: ', err);
                        return done(err);
                    } else {
                        expect(response.status).toBe(201);
                        expect(response.body).toHaveProperty('id', expect.any(Number));
                        expect(response.body).toHaveProperty('email', userInput.email);
                        expect(response.body).toHaveProperty('role', userInput.role);
                        expect(response.body).not.toHaveProperty('password');
                        return done();
                    }
                });
            })
            test('Should return id, email, and role - buyer (because role is emptied) with status 201', done => {
                const norole = { ...userInput }
                norole.email = 'fadhilman@mail.com'
                norole.role = ''
                request(app)
                    .post('/register')
                    .send(norole)
                    .end((err, response) => {
                    if (err) {
                        console.log('Error testing: ', err);
                        return done(err);
                    } else {
                        expect(response.status).toBe(201);
                        expect(response.body).toHaveProperty('id', expect.any(Number));
                        expect(response.body).toHaveProperty('email', norole.email);
                        expect(response.body).toHaveProperty('role', 'buyer');
                        expect(response.body).not.toHaveProperty('password');
                        return done();
                    }
                });
            })
        })
        describe('Register - error', () => {
            test('Should return error and status 400 because email is in invalid format', done => {
                const invalid = { ...userInput }
                invalid.email = 'asdf'
                const error = {
                    message: 'Must use valid email format'
                }
                request(app)
                    .post('/register')
                    .send(invalid)
                    .end((err, response) => {
                        if (err) {
                            console.log('Error testing: ', err);
                            return done(err);
                        } else {
                            expect(response.status).toBe(400);
                            expect(response.body).toHaveProperty('message', error.message);
                            return done();
                        }
                    });
            })
            test('Should return error and status 400 because email is already in use', done => {
                const invalid = { ...userInput }
                invalid.email = 'admin@mail.com'
                const error = {
                    message: 'Email is already in use'
                }
                request(app)
                    .post('/register')
                    .send(invalid)
                    .end((err, response) => {
                        if (err) {
                            console.log('Error testing: ', err);
                            return done(err);
                        } else {
                            expect(response.status).toBe(400);
                            expect(response.body).toHaveProperty('message', error.message);
                            return done();
                        }
                    });
            })
            test('Should return error and status 400 because password is less than 6 or more than 16 characters', done => {
                const invalid = { ...userInput }
                invalid.password = 'asdf'
                const error = {
                    message: 'Password must be between 6-16 characters.'
                }
                request(app)
                    .post('/register')
                    .send(invalid)
                    .end((err, response) => {
                        if (err) {
                            console.log('Error testing: ', err);
                            return done(err);
                        } else {
                            expect(response.status).toBe(400);
                            expect(response.body).toHaveProperty('message', error.message);
                            return done();
                        }
                    });
            })
        })
    })
    describe('POST /login', () => {
        describe('Login - success', () => {
            test('should send access token with status 200', done => {
                const login = {
                    email: admin.email,
                    password: admin.password
                }
                request(app)
                .post('/login')
                .send(login)
                .end((err, response) => {
                    if (err) {
                        console.log('Error testing: ', err);
                        return done(err);
                    } else {
                        expect(response.status).toBe(200);
                        expect(response.body).toHaveProperty('email', login.email);
                        expect(response.body).toHaveProperty('token');
                        return done();
                    }
                });
            })
        })
        describe('Login - error', () => {
            test('should return error and status 400 because email/password mismatched', done => {
                const failToLog = {
                    email: userInput.email,
                    password: admin.password
                }
                const error = {
                    message: 'Wrong email or password'
                }
                request(app)
                .post('/login')
                .send(failToLog)
                .end((err, response) => {
                    if (err) {
                        console.log('Error testing: ', err);
                        return done(err);
                    } else {
                        expect(response.status).toBe(400);
                        expect(response.body).toHaveProperty('message', error.message);
                        return done();
                    }
                });
            })
        })
    })
    describe('PATCH /reset', () => {
        describe('Password reset is successful', () => {
            test('should return status 200 and the reset password', done => {
                const resetPass = {
                    email: userInput.email
                };
                request(app)
                .patch('/reset')
                .send(resetPass)
                .end((err, response) => {
                    if (err) {
                        console.log('Error testing:', err);
                        return done(err);
                    } else {
                        expect(response.status).toBe(200);
                        expect(response.body).toHaveProperty('newPass');
                        return done();
                    }
                })
            });
        });
        describe('Reset - error', () => {
            test('should return status 404 because the email does not exist', done => {
                const falseEmail = {
                    email: 'fakemail@false.com'
                };
                const error = {
                    message: 'Email does not exist'
                };
                request(app)
                .patch('/reset')
                .send(falseEmail)
                .end((err, response) => {
                    if (err) {
                        console.log('Error testing', err);
                        return done(err);
                    } else {
                        expect(response.status).toBe(404);
                        expect(response.body).toHaveProperty('message', error.message);
                        return done();
                    }
                })
            })
        })
    });
});