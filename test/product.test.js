const app = require('../app')
const request = require('supertest')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')

const dummyProduct = {
    name: 'masker',
    image_url: 'https://media.suara.com/pictures/653x366/2020/02/29/45914-ilustrasi-masker.jpg',
    price: 5000,
    stock: 10
} 

let id = 0
let token = ''

beforeAll(done => {
    User.create({
        email: 'auth@mail.com',
        password: '123',
        role: 'admin'
    })
        .then( result => {
            let payload = {
                id: result.id,
                email: result.email
            }
            token = generateToken(payload)
            return done()
        })
        .catch( err => {
            return done(err)
        })
})

afterAll(done => {
    queryInterface.bulkDelete('Products')
        .then( () => {
            console.log('Products cleaned...')
            return queryInterface.bulkDelete('Users')
        })
        .then( () => {
            console.log('Users cleaned...')
            return done()
        })
        .catch( err => {
            return done(err)
        })
})

describe('Product Service', () => {
    describe('POST /products', () => {
        describe('Successful Create', () => {
            test('should return object with status 201 and product detail', (done) => {
                request(app)
                    .post('/products')
                    .set('access_token', token)
                    .send(dummyProduct)
                    .end((err, res) => {
                        if(err) {
                            console.log(err)
                            return done(err)
                        } else {
                            expect(res.status).toBe(201)
                            expect(res.body.result).toHaveProperty('id', expect.any(Number))
                            expect(res.body.result).toHaveProperty('name', expect.any(String))
                            expect(res.body.result).toHaveProperty('image_url', expect.any(String))
                            expect(res.body.result).toHaveProperty('price', expect.any(Number))
                            expect(res.body.result).toHaveProperty('stock', expect.any(Number))
                            id = res.body.result.id
                            return done()
                        }
                    })
            })
        })
        // describe('Failed Create', () => {
        //     test('should return error with status 400 because product detail is null', done => {
            
        //     })
        //     test('should return error with status 400 because product detail is empty string', done => {
            
        //     })
        //     test('should return error with status 400 because stock and price is negative', done => {
            
        //     })
        // })
    })
    describe('GET /products', () => {
        describe('Successful FindAll', () => {
            test('should return object with status 200 and product detail', done => {
                request(app)
                    .get('/products')
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
        describe('Successful FindOne', () => {
            test('should return message with status 200', done => {
                request(app)
                    .get('/products/1')
                    .set('access_token', token)
                    .end((err, res) => {
                        if (err) {
                            console.log(err)
                            return done(err)
                        } else {
                            expect(res.status).toBe(200)
                            expect(res.body).toHaveProperty('message', 'Found')
                            return done()
                        }
                    })
            })    
        })
    })
    describe('PUT /products', () => {
        describe('Successful Update', () => {
            test('should return object with status 200 and product detail', done => {
                request(app)
                    .put('/products/' + id)
                    .set('access_token', token)
                    .send({
                            name: 'updatedMasker',
                            image_url: 'updatedhttps://media.suara.com/pictures/653x366/2020/02/29/45914-ilustrasi-masker.jpg',
                            price: 9995000,
                            stock: 99910
                    })
                    .end((err, res) => {
                        if (err) {
                            console.log(err)
                            return done(err)
                        } else {
                            expect(res.status).toBe(200)
                            expect(res.body).toHaveProperty('message', 'Successfully updated product')
                            return done()
                        }
                    })
            })
        })      
    })
    describe('DELETE /products', () => {
        describe('Successful Delete', () => {
            test('should return message with status 200', done => {
                request(app)
                    .delete('/products/' + id)
                    .set('access_token', token)
                    .end((err, res) => {
                        if (err) {
                            console.log(err)
                            return done(err)
                        } else {
                            expect(res.status).toBe(200)
                            expect(res.body).toHaveProperty('message', 'Successfully deleted product')
                            return done()
                        }
                    })
            })
        })
    })
})