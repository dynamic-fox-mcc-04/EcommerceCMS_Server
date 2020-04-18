const app = require('../app');
const request = require('supertest');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const { generateToken } = require('../helpers/jwt');
const { User } = require('../models');

let token = '';

beforeAll((done) => {
    const admin = {
        username: 'user001',
        email: 'admin@mail.com',
        password: 'user001',
        role: 'admin'
    }
    User.create(admin)
        .then(newUser => {
            const payload = { 
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
             };
            // console.log('ini payload', payload)
            token = generateToken(payload)
            done()
        })
        .catch(err => {
            done(err)
        })
})

//do afterAll bellow if all function have running well
// afterAll((done) => {
//     queryInterface.bulkDelete('Products', {})
//         .then(_ => {
//             console.log('Db clean up')
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
// })

describe('Product Routes', () => {
    describe('POST /products', () => {
        describe('Success Process', () => {
            test('Should return an object (username, image_url, price, stock) with status code 201', (done) => {
                let newProduct = {
                    name: 'OLYMPUS OM-D E-M1 Mark II kit 12-40mm f/2.8 PRO (Black)',
                    image_url: 'https://ecommercehacktiv8.s3-ap-southeast-1.amazonaws.com/rsz_col24171-olympus-om-d-e-m1-mark-ii-kit-12-40mm-f28-pro-_black__d1.png',
                    price: 37299000,
                    stock: 5,
                    category: 'Olympus'
                }
                request(app)
                    .post('/products')
                    .set('token', token)
                    .send(newProduct)
                    .end((err, res) => {
                        // console.log('token ====> ', token);
                        expect(res.body).toHaveProperty('name', newProduct.name)
                        expect(res.body).toHaveProperty('image_url', newProduct.image_url)
                        expect(res.body).toHaveProperty('price', newProduct.price)
                        expect(res.body).toHaveProperty('stock', newProduct.stock)
                        expect(res.body).toHaveProperty('category', newProduct.category)
                        expect(res.status).toBe(201)
                        expect(err).toBe(null)
                        done()
                    })
            })
        })
        describe('Error Process', () => {
            test('Should return a message about authorization failed', (done) => {
                let newProduct = {
                    name: 'OLYMPUS OM-D E-M1 Mark II kit 12-40mm f/2.8 PRO (Black)',
                    image_url: 'https://ecommercehacktiv8.s3-ap-southeast-1.amazonaws.com/rsz_col24171-olympus-om-d-e-m1-mark-ii-kit-12-40mm-f28-pro-_black__d1.png',
                    price: 37299000,
                    stock: 5,
                    category: 'Olympus'
                }
                request(app)
                    .post('/products')
                    .send(newProduct)
                    .end((err, res) => {
                        expect(res.body).toHaveProperty('message', expect.any(String))
                        expect(res.status).toBe(401)
                        done()
                })
            })
        })
    })
    describe('GET /products', () => {
        beforeEach((done) => {
            queryInterface.bulkInsert('Products', [{
                name: 'OLYMPUS OM-D E-M1 Mark II kit 12-40mm f/2.8 PRO (Black)',
                image_url: 'https://ecommercehacktiv8.s3-ap-southeast-1.amazonaws.com/rsz_col24171-olympus-om-d-e-m1-mark-ii-kit-12-40mm-f28-pro-_black__d1.png',
                price: 37299000,
                stock: 5,
                category: 'Olympus',
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Nikon D850 Kit AF-S VR 24-120mm f/4G',
                image_url: 'https://ecommercehacktiv8.s3-ap-southeast-1.amazonaws.com/CNK24169-Nikon-D850-Kit-AF-S-VR-24-120mm-f4G_D1-rev.png',
                price: 49999000,
                stock: 10,
                category: 'Nikon',
                createdAt: new Date(),
                updatedAt: new Date()
            }])
                .then(_ => {
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        describe('Success Process', () => {
            test('Should return an array of object (name, image_url, price, stock) with status code 200', (done) => {
                request(app)
                    .get('/products')
                    .set('token', token)
                    .end((err, res) => {
                        expect.any(Array)
                        expect(res.status).toBe(200)
                        expect(err).toBe(null)
                        done()
                    })
            })
        })
    })
    describe('UPDATE /products', () => {
        describe('Success Process', () => {
            test('Should return an object (name, image_url, price, stock) with status code 200', (done) => {
                let update = {
                    name: 'Nikon D850 Kit AF-S VR 24-120mm f/4G',
                    image_url: 'https://ecommercehacktiv8.s3-ap-southeast-1.amazonaws.com/CNK24169-Nikon-D850-Kit-AF-S-VR-24-120mm-f4G_D1-rev.png',
                    price: 50000000,
                    stock: 10,
                    category: 'Nikon',
                }
                request(app)
                    .put('/products/20')
                    .set('token', token)
                    .send(update)
                    .end((err, res) => {
                        expect(res.body).toHaveProperty('name', update.name)
                        expect(res.body).toHaveProperty('image_url', update.image_url)
                        expect(res.body).toHaveProperty('price', expect.any(Number))
                        expect(res.body).toHaveProperty('stock', expect.any(Number))
                        expect(res.status).toBe(200)
                        expect(err).toBe(null)
                        done()
                    })
            })
        })
    })
    describe('GET /products/:id', () => {
        beforeEach((done) => {
            queryInterface.bulkInsert('Products', [{
                name: 'OLYMPUS OM-D E-M1 Mark II kit 12-40mm f/2.8 PRO (Black)',
                image_url: 'https://ecommercehacktiv8.s3-ap-southeast-1.amazonaws.com/rsz_col24171-olympus-om-d-e-m1-mark-ii-kit-12-40mm-f28-pro-_black__d1.png',
                price: 37299000,
                stock: 5,
                category: 'Olympus',
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Nikon D850 Kit AF-S VR 24-120mm f/4G',
                image_url: 'https://ecommercehacktiv8.s3-ap-southeast-1.amazonaws.com/CNK24169-Nikon-D850-Kit-AF-S-VR-24-120mm-f4G_D1-rev.png',
                price: 49999000,
                stock: 10,
                category: 'Nikon',
                createdAt: new Date(),
                updatedAt: new Date()
            }])
                .then(_ => {
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        describe('Success Process', () => {
            test('Should return an array of object (name, image_url, price, stock) with status code 200', (done) => {
                request(app)
                    .get('/products/20')
                    .set('token', token)
                    .end((err, res) => {
                        // console.log('//------>>>', res.body);
                        expect(res.status).toBe(200)
                        expect(err).toBe(null)
                        done()
                    })
            })
        })
    })
})