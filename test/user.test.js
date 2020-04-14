const request = require('supertest')
const sum = require('../sum');
const app = require('../app.js')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize
const { hashPassword } = require('../helpers/bcrypt')

const admin = {
    email: 'admin@mail.com',
    password: 'mushroom'
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
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
        .then(() => {
            console.log('User created: ' + admin.email);
            done();
        })
        .catch(err => {
            done(err);
        });
});

describe('User service', () => {
    describe('POST /register', () => {
        describe('Register - success', () => {
            test('Should return id, email, and role with status 201', done => {
                const userInput = {
                    email: 'fadhil@mail.com',
                    password: 'fadhilman',
                    role: 'paid'
                };
                request(app)
                    .post('/register')
                    .send(userInput)
                    .end((err, response) => {
                    if (err) {
                        console.log('There is some error: ', err);
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
            test('Should return id, email, and role - free (because role is emptied) with status 201', done => {
                const userInput = {
                    email: 'fadhil@mail.com',
                    password: 'fadhilman'
                  };
                request(app)
                    .post('/register')
                    .send(userInput)
                    .end((err, response) => {
                    if (err) {
                        console.log('There is some error: ', err);
                        return done(err);
                    } else {
                        expect(response.status).toBe(201);
                        expect(response.body).toHaveProperty('id', expect.any(Number));
                        expect(response.body).toHaveProperty('email', userInput.email);
                        expect(response.body).toHaveProperty('role', 'free');
                        expect(response.body).not.toHaveProperty('password');
                        return done();
                    }
                });
            })
        })
        describe('Register - error', () => {
            test('Should return error and status 400 because email is in invalid format', done => {
                const userInput = {
                    email
                }
            })
        })
    })
})