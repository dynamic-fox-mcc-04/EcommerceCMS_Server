const app = require('../app.js')
const request = require('supertest')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { encryptPassword } = require('../helpers/bcrypt.js')

let productId;
let adminToken = '';
let customerToken = '';
let data = {
    productName: 'terminator',
    imageUrl: 'https://cdn.elevenia.co.id/g/8/0/5/4/3/7/18805437_B_V1.jpg',
    price: 150000,
    stock: 10,
    category: 'sneakers'
}

afterAll(done => {
    queryInterface.bulkDelete('Products', {})
        .then(() => {
            return queryInterface.bulkDelete('Users', {})
        })
        .then(() => {
            return done()
        })
        .catch(err => {
            return done(err)
        })
})

beforeAll(done => {
    queryInterface.bulkInsert('Users', [{
            username: "renata",
            email: "admin@gmail.com",
            password: encryptPassword('12341234'),
            role: "admin",
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            username: "bebaslah",
            email: "bebaslah@gmail.com",
            password: encryptPassword('12345678'),
            role: "customer",
            createdAt: new Date(),
            updatedAt: new Date()
        }])
        .then(() => {
            request(app)
                .post('/users/login')
                .send({
                    email: "admin@gmail.com",
                    password: '12341234'
                })
                .end((err, res) => {
                    if (err) {
                        done(err)
                    } else {
                        // console.log(`===============result login admin`, res.body)
                        // console.log(`ini token admin`, res.body.token)
                        adminToken = res.body.token
                        request(app)
                            .post('/users/login')
                            .send({
                                email: "bebaslah@gmail.com",
                                password: '12345678'
                            })
                            .end((err, res) => {
                                if (err) {
                                    done(err)
                                } else {
                                    // console.log(`=============result login cust`, res.body)
                                    // console.log(`ini token cust`, res.body.token)
                                    customerToken = res.body.token
                                    return done()
                                }
                            })
                    }
                })
        })

})

describe('product service', () => {
    describe('POST /products', () => {
        describe('success case', () => {
            test('respond will return new product with status code (201)', (done) => {
                request(app)
                    .post('/products')
                    .set('token', adminToken)
                    .send(data)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            productId = res.body.id
                            console.log(`+++++++++++++++++++`,productId)
                            expect(res.status).toBe(201)
                            expect(res.body).toHaveProperty('id', expect.any(Number))
                            expect(res.body).toHaveProperty('poductName', data.poductName)
                            expect(res.body).toHaveProperty('imageUrl', data.imageUrl)
                            expect(res.body).toHaveProperty('price', data.price)
                            expect(res.body).toHaveProperty('stock', data.stock)
                            expect(res.body).toHaveProperty('category', data.category)
                            return done()
                        }
                    })
            })
            test('respond will return new product with status code (201) with img url default value', (done) => {
                const emptyimageurl = {...data }
                delete emptyimageurl.imageUrl
                request(app)
                    .post('/products')
                    .set('token', adminToken)
                    .send(emptyimageurl)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.status).toBe(201)
                            expect(res.body).toHaveProperty('id', expect.any(Number))
                            expect(res.body).toHaveProperty('poductName', emptyimageurl.poductName)
                            expect(res.body).toHaveProperty('imageUrl', "https://discountseries.com/wp-content/uploads/2017/09/default.jpg")
                            expect(res.body).toHaveProperty('price', emptyimageurl.price)
                            expect(res.body).toHaveProperty('stock', emptyimageurl.stock)
                            expect(res.body).toHaveProperty('category', emptyimageurl.category)
                            return done()
                        }
                    })
            })
        })
        describe('error case', () => {
            test('respond will return error with status code (401) because jsonwebtoken error', (done) => {
                const errors = [{
                    message: `Please Login`
                }]
                request(app)
                    .post('/products')
                    .set('token', `asdadasdd`)
                    .send(data)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.status).toBe(401)
                            expect(res.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })

            test('error caused by empty properties, with status code 400', (done) => {
                const errors = [{
                        message: 'product name is required'
                    },
                    {
                        message: 'stock is required'
                    },
                    {
                        message: 'price is required'
                    },
                    {
                        message: 'category is required'
                    }
                ]
                request(app)
                    .post('/products')
                    .set('token', customerToken)
                    // .send(data)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.status).toBe(400)
                            expect(res.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })
            test('error caused price is less then 0, with status code 400', (done) => {
                let newData = {
                    productName: 'terminator',
                    imageUrl: 'https://cdn.elevenia.co.id/g/8/0/5/4/3/7/18805437_B_V1.jpg',
                    price: -1,
                    stock: 10,
                    category: 'sneakers'
                }
                const errors = [{
                    message: 'Price must be greater than or equal to 0'
                }]
                request(app)
                    .post('/products')
                    .set('token', customerToken)
                    .send(newData)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.status).toBe(400)
                            expect(res.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })
            test('error caused stock is less then 0, with status code 400', (done) => {
                let newData = {
                    productName: 'terminator',
                    imageUrl: 'https://cdn.elevenia.co.id/g/8/0/5/4/3/7/18805437_B_V1.jpg',
                    price: 15000,
                    stock: -1,
                    category: 'sneakers'
                }
                const errors = [{
                    message: 'Stock must be greater than or equal to 0'
                }]
                request(app)
                    .post('/products')
                    .set('token', customerToken)
                    .send(newData)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.status).toBe(400)
                            console.log(`+++++++++++++++++++2`,productId)
                            expect(res.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })
        })
    })
    describe('PUT /products', () => {
        describe('success case', () => {
            test('respond will return updated product with status code (200)', done => {
                const message = `Successfully edited one product`
                request(app)
                    .put(`/products/${productId}`)
                    .set('token', adminToken)
                    .send({
                        id: `${productId}`,
                        productName: 'blee',
                        imageUrl: 'https://cdn.elevenia.co.id/g/8/0/5/4/3/7/18805437_B_V1.jpg',
                        price: 120500,
                        stock: 2,
                        category: 'sneakers'
                    })
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.status).toBe(200)
                            expect(res.body).toHaveProperty('message', message)
                            return done()
                        }
                    })
            })
        })
        describe('error case', () => {
            test('respond will return error with status code (401) because jsonwebtoken error', (done) => {
                const errors = [{
                    message: `Please Login`
                }]
                request(app)
                    .put(`/products/${productId}`)
                    .set('token', `asdadasdd`)
                    .send(data)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.status).toBe(401)
                            expect(res.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })
            test('respond will return error with status code (401) because unauthorized', (done) => {
                const errors = [{
                    message: `you are unauthorized`
                }]
                request(app)
                    .put(`/products/${productId}`)
                    .set('token', customerToken)
                    .send(data)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.status).toBe(403)
                            expect(res.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })
        })
    })
    describe('DELETE /products', () => {
        describe('success case', () => {
            test('respond will return deleted product with status code (200)', done => {
                const message = `Successfully deleted one product`
                request(app)
                    .delete(`/products/${productId}`)
                    .set('token', adminToken)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.status).toBe(200)
                            expect(res.body).toHaveProperty('message', message)
                            return done()
                        }
                    })
            })
        })
        describe('error case', () => {
            test('respond will return error with status code (401) because jsonwebtoken error', (done) => {
                const errors = [{
                    message: `Please Login`
                }]
                request(app)
                    .delete(`/products/${productId}`)
                    .set('token', `asdadasdd`)
                    .send(data)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.status).toBe(401)
                            expect(res.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })
            test('respond will return error with status code (401) because unauthorized', (done) => {
                const errors = [{
                    message: `you are unauthorized`
                }]
                request(app)
                    .delete(`/products/${productId}`)
                    .set('token', customerToken)
                    .send(data)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.status).toBe(403)
                            expect(res.body).toHaveProperty('errors', errors)
                            return done()
                        }
                    })
            })
        })
    })
    describe('GET /products', () => {
        describe('success case', () => {
            test('respond will return all products data with status code (200)', done => {
                request(app)
                    .get(`/products`)
                    .set('token', adminToken)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.status).toBe(200)
                            expect(res.body).toHaveProperty('Products', expect.any(Array))
                            return done()
                        }
                    })
            })
        })
    })
})