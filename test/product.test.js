const request = require('supertest')
const app = require('../app.js')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize
const { hashPassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')

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
                id: 1,
                email: admin.email,
                password: passwordHashed,
                role: admin.role,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 2,
                email: 'fadhil@mail.com',
                password: hashPassword('fadhilman'),
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 3,
                email: 'ardha@mail.com',
                password: hashPassword('mahahaha'),
                role: 'buyer',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
        .then(() => {
            console.log('Super admin created: ' + admin.email);
            console.log('admin created: fadhil@mail.com');
            console.log('buyer created: ardha@mail.com');
            done();
        })
        .catch(err => {
            done(err);
        });
});

const token = createToken({
    id: 1,
    email: admin.email
})
const token2 = createToken({
    id: 2,
    email: 'fadhil@mail.com'
})
const token3 = createToken({
    id: 3,
    email: 'ardha@mail.com'
})

const productInput = {
    title: 'JetSki',
    image_url: 'asdf',
    price: 1500,
    stock: 25,
    category: 'toy'
}

const change = {
    title: 'BananaB',
    image_url: 'jkrl',
    price: 2000,
    stock: 15,
    category: 'toy'
}

let testId = 1

describe('Product service', () => {
    describe('POST /product', () => {
        describe('Success creating product', () => {
            test('Should return the product data with status 201', done => {
                request(app)
                .post('/product')
                .set('token', token)
                .send(productInput)
                .end((err, response) => {
                    if (err) {
                        console.log('Error testing: ', err);
                        return done(err);
                    } else {
                        console.log(response.body)
                        testId = response.body.id
                        expect(response.status).toBe(201);
                        expect(response.body).toHaveProperty('id', expect.any(Number))
                        expect(response.body).toHaveProperty('title', productInput.title);
                        expect(response.body).toHaveProperty('image_url', productInput.image_url);
                        expect(response.body).toHaveProperty('price', productInput.price);
                        expect(response.body).toHaveProperty('stock', productInput.stock);
                        expect(response.body).toHaveProperty('category', productInput.category);
                        return done();
                    }
                })
            })
        })
        describe('Error creating product', () => {
            test('Should return error and status 400 because product title should be at least 1 characters in length', done => {
                const noTitle = { ...productInput }
                noTitle.title = ''
                const error = {
                    message: 'Title must be at least 1 character in length.'
                }
                request(app)
                .post('/product')
                .set('token', token)
                .send(productInput)
                .end((err, response) => {
                    if (err) {
                        console.log('Error testing: ', err);
                        return done(err);
                    } else {
                        expect(response.status).toBe(400);
                        expect(response.body).toHaveProperty('message', error.message);
                        return done();
                    }
                })
            })
            test('Should return error and status 400 because product stock should have a value of at least 0', done => {
                const stockError = { ...productInput }
                stockError.stock = -1
                const error = {
                    message: 'Minimum stock is 0.'
                }
                request(app)
                .post('/product')
                .set('token', token)
                .send(productInput)
                .end((err, response) => {
                    if (err) {
                        console.log('Error testing: ', err);
                        return done(err);
                    } else {
                        expect(response.status).toBe(400);
                        expect(response.body).toHaveProperty('message', error.message);
                        return done();
                    }
                })
            })
            test('Should return error and status 400 because product price should have a value of at least 0', done => {
                const priceError = { ...productInput }
                priceError.price = 0
                const error = {
                    message: 'Minimum price is 1.'
                }
                request(app)
                .post('/product')
                .set('token', token)
                .send(productInput)
                .end((err, response) => {
                    if (err) {
                        console.log('Error testing: ', err);
                        return done(err);
                    } else {
                        expect(response.status).toBe(400);
                        expect(response.body).toHaveProperty('message', error.message);
                        return done();
                    }
                })
            })
            test('Should return error and status 401 because user accessing this route is not THE super admin', done => {
                const error = {
                    message: 'User unauthenticated - not a super admin'
                }
                request(app)
                .post('/product')
                .set('token', token2)
                .send(productInput)
                .end((err, response) => {
                    if (err) {
                        console.log('Error testing: ', err);
                        return done(err);
                    } else {
                        expect(response.status).toBe(401);
                        expect(response.body).toHaveProperty('message', error.message);
                        return done();
                    }
                })
            })
        })
    })
    describe('GET /product', () => {
        describe('Success fetching product', () => {
            test('Should return all product data with status 200', done => {
                request(app)
                .get('/product')
                .set('token', token)
                .send(productInput)
                .end((err, response) => {
                    if (err) {
                        console.log('Error testing: ', err);
                        return done(err);
                    } else {
                        expect(response.status).toBe(200);
                        const firstData = response.body[0]
                        expect(firstData).toHaveProperty('id', expect.any(Number))
                        expect(firstData).toHaveProperty('title', productInput.title)
                        expect(firstData).toHaveProperty('image_url', productInput.image_url)
                        expect(firstData).toHaveProperty('price', productInput.price)
                        expect(firstData).toHaveProperty('stock', productInput.stock)
                        expect(firstData).toHaveProperty('category', productInput.category)
                        return done();
                    }
                })
            })
        })
    })
    describe('PUT /product', () => {
        describe('Success updating product', () => {
            test('Should return the product data with status 200', done => {
                request(app)
                .put('/product')
                .set('token', token)
                .send(change)
                .end((err, response) => {
                    if (err) {
                        console.log('Error testing: ', err);
                        return done(err);
                    } else {
                        console.log(response.body)
                        expect(response.status).toBe(200);
                        expect(response.body).toHaveProperty('id', testId)
                        expect(response.body).toHaveProperty('title', change.title);
                        expect(response.body).toHaveProperty('image_url', change.image_url);
                        expect(response.body).toHaveProperty('price', change.price);
                        expect(response.body).toHaveProperty('stock', change.stock);
                        expect(response.body).toHaveProperty('category', change.category);
                        return done();
                    }
                })
            })
        })
    })
})