const app = require('../app')
const request = require('supertest')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { generate } = require('../helpers/bcrypt')

const testAccount = {
    email: 'test@mail.com',
    password: 'tester'
}

beforeAll(done => {
    const generatedPassword = generate(testAccount.password)
    queryInterface
        .bulkInsert('Users', [{
            email: testAccount.email,
            password: generatedPassword,
            createdAt: new Date(),
            updatedAt: new Date()
        }])
        .then(() => {
            console.log('Success Create User ' + testAccount.email);
            done();
        })
        .catch(err => {
            done(err);
        })
})

afterAll((done) => {
    queryInterface.bulkDelete('Users')
        .then((result) => {
            console.log('Test Done.')
            done()
        }).catch((err) => {
            done(err)
        })
})


describe('User services', () => {
    describe('POST /user/register', () => {
            describe('success register', () => {
                test('Should return object{id,email,access_token} with status code : 201', done => {

                    const testInput = {
                        email: 'example@mail.com',
                        password: 'abcd123'
                    }

                    request(app)
                        .post('/user/register')
                        .send(testInput)
                        .end((err, response) => {
                            if (err) {
                                return done(err)
                            } else {
                                expect(response.status).toBe(201);
                                expect(response.body).toHaveProperty('id', expect.any(Number));
                                expect(response.body).toHaveProperty('email', testInput.email);
                                return done()
                            }
                        })
                })
            })
            describe('error register user', () => {
                test('should send error and status 400 missing email and password', done => {
                    const errors = [{
                            message: 'Email Required.'
                        },
                        {
                            message: 'Password Required.'
                        }
                    ];
                    request(app)
                        .post('/user/register')
                        .end((err, response) => {
                            if (err) {
                                return done(err);
                            } else {
                                expect(response.status).toBe(400);
                                expect(response.body).toHaveProperty('errors', errors);
                                return done();
                            }
                        })
                })

                // test('should send error and status 400 email already registered.', done => {
                //     const errors = [{
                //         message: 'Email already Registered'
                //     }];
                //     request(app)
                //         .post('/user/register')
                //         .send(testAccount)
                //         .end((err, response) => {
                //             if (err) {
                //                 return done(err);
                //             } else {
                //                 console.log(response.body);
                //                 expect(response.status).toBe(400);
                //                 expect(response.body).toHaveProperty('errors', errors);
                //                 return done();
                //             }
                //         })
                // })
            })
        })
        // describe('POST /user/login', () => {
        //     describe('success login', () => {
        //         test('should send object{id,email,access_token} and status 200', done => {
        //             request(app)
        //                 .post('/user/login')
        //                 .send(testAccount)
        //                 .end((err, response) => {
        //                     if (err) {
        //                         return done(err);
        //                     } else {
        //                         expect(response.status).toBe(200);
        //                         expect(response.body).toHaveProperty('id', expect.any(Number));
        //                         expect(response.body).toHaveProperty('email', testInput.email);
        //                         expect(response.body).toHaveProperty('access_token');
        //                         return done();
        //                     }
        //                 })
        //         })
        //     })
        // })
})