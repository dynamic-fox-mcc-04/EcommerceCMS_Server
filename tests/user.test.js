const { app } = require("../app")
const request = require("supertest")
const { sequelize } = require("../models")
const { queryInterface } = sequelize
const bcrypt = require("bcryptjs")
const { getToken } = require("../helpers/jwt")
const { User } = require("../models/index")
let access_token = {}

afterAll((done) => {
    queryInterface.bulkDelete('Users')
        .then(() => {
            return queryInterface.bulkDelete('Products')
        })
        .then(() => {
            console.log('db restored')
            return done()
        }).catch(err => done(err))
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
            // console.log('RESULT:::', result)
            // console.log('New user created: ' + result.email)
            return done()
        }).catch(err => done(err))
})
describe('OVERALL TEST', () => {
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
                                // console.log(res.body, 'INI')
                                access_token = res.body.access_token
                                expect(res.body).toHaveProperty('id', expect.any(Number))
                                expect(res.body).toHaveProperty('email', inputLogin.email)
                                expect(res.body).toHaveProperty('access_token', access_token)
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
                                // console.log('INI', res.body)
                                expect(res.status).toBe(400)
                                expect(res.body).toHaveProperty('errors', errorLogin);
                                return done()
                            }
                        })
                })
            })
            describe('error invalid login "email"', () => {
                test('should return error with status 400', done => {
                    const invalidEmail = {
                        email: 'userrr@mail.com',
                        password: '12345'
                    }
                    const errorLogin = { msg: 'Invalid email/password', type: 'Bad Request' }
                    request(app)
                        .post('/login')
                        .send(invalidEmail)
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
    describe('product service', () => {
        describe('POST /products', () => {
            describe('success create', () => {
                test('should return object with id and data of products and status 201', done => {
                    const inputProducts = {
                        name: 'samsung galaxy flip z',
                        image_url: 'https://images.samsung.com/id/smartphones/galaxy-z-flip/buy/0-bloom-black-purple-family-1-pc-img.jpg',
                        price: 22000000,
                        stock: 10
                    }
                    User.findOne({
                        where: {
                            'email': 'user@mail.com'
                        }
                    }).then(result => {
                        let payload = {
                            id: result.id,
                            email: result.email
                        }
                        access_token = getToken(payload)
                        request(app)
                            .post('/products')
                            .set({ 'access_token': access_token, Accept: 'application/json' })
                            // .set('access_token', access_token)
                            .send(inputProducts)
                            .end((err, res) => {
                                if (err) {
                                    return done(err)
                                } else {
                                    expect(res.status).toBe(201)
                                    expect(res.body).toHaveProperty('id', expect.any(Number))
                                    expect(res.body).toHaveProperty('price', inputProducts.price)
                                    expect(res.body).toHaveProperty('stock', inputProducts.stock)
                                    expect(res.body).toHaveProperty('name', inputProducts.name)
                                    expect(res.body).toHaveProperty('image_url', inputProducts.image_url)
                                    return done()
                                }
                            })
                    })
                    // .catch(err => done(err))
                })
            })

            describe('error auth', () => {
                test('should return error invalid token, not authorized', done => {
                    const inputProductNull = {
                        name: 'sepatu nike',
                        image_url: 'img.jpg',
                        price: 1000000,
                        stock: 5
                    }
                    const errorToken = "invalid token"
                    request(app)
                        .post('/products')
                        .send(inputProductNull)
                        .end((err, res) => {
                            if (err) {
                                return done(err)
                            } else {
                                expect(res.status).toBe(401)
                                // console.log('INI', res.body)
                                expect(res.body).toHaveProperty('errors', errorToken);
                                return done()
                            }
                        })
                })
            })
            describe('error validation null', () => {
                test('should return error validation not null with status 400', done => {
                    const errorNull = [{ "message": "The name of products is required" }, {
                        "message": "The image_url is required",
                    }, {
                        "message": "price is required",
                    }]
                    User.findOne({
                        where: {
                            'email': 'user@mail.com'
                        }
                    }).then(result => {
                        let payload = {
                            id: result.id,
                            email: result.email
                        }
                        access_token = getToken(payload)
                        request(app)
                            .post('/products')
                            .set({ 'access_token': access_token, Accept: 'application/json' })
                            // .send(inputProductNull)
                            .end((err, res) => {
                                if (err) {
                                    return done(err)
                                } else {
                                    console.log('INI', res.body)
                                    expect(res.status).toBe(400)
                                    expect(res.body).toHaveProperty('errors', errorNull);
                                    return done()
                                }
                            })
                    })
                })
            })
            describe('error validation empty', () => {
                test('should return error validation not null with status 400', done => {
                    const errorEmpty = [
                        { message: "The image_url is required", "message": "price is required" },
                        {
                            "message": "The name of products must not be an empty string",
                        },
                        { message: 'The image_url must not be an empty string' },
                    ]
                    const inputProductEmpty = {
                        name: '',
                        image_url: ''
                    }
                    User.findOne({
                        where: {
                            'email': 'user@mail.com'
                        }
                    }).then(result => {
                        let payload = {
                            id: result.id,
                            email: result.email
                        }
                        access_token = getToken(payload)
                        request(app)
                            .post('/products')
                            .set({ 'access_token': access_token, Accept: 'application/json' })
                            .send(inputProductEmpty)
                            .end((err, res) => {
                                if (err) {
                                    return done(err)
                                } else {
                                    console.log('ITU', res.body)
                                    expect(res.status).toBe(400)
                                    expect(res.body).toHaveProperty('errors', errorEmpty);
                                    return done()
                                }
                            })
                    })
                })
            })
            describe('error minimum price', () => {
                test('should return error validation minimum price with status 400', done => {
                    const errorPrice = [
                        {
                            "message": "price muste be IDR 2000 or higher",
                        }
                    ]
                    const inputPriceError = {
                        name: 'iphone',
                        image_url: 'iphone.jpg',
                        price: 1000,
                        stock: 10
                    }
                    User.findOne({
                        where: {
                            'email': 'user@mail.com'
                        }
                    }).then(result => {
                        let payload = {
                            id: result.id,
                            email: result.email
                        }
                        access_token = getToken(payload)
                        request(app)
                            .post('/products')
                            .set({ 'access_token': access_token, Accept: 'application/json' })
                            .send(inputPriceError)
                            .end((err, res) => {
                                if (err) {
                                    return done(err)
                                } else {
                                    console.log('APA', res.body)
                                    expect(res.status).toBe(400)
                                    expect(res.body).toHaveProperty('errors', errorPrice);
                                    return done()
                                }
                            })
                    })
                })
            })
        })
    })
})
// module.exports = access_token