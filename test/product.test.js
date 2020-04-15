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
                    name: 'Nike Air Jordan 1 Low',
                    image_url: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/jk6pwv5o9uos8n2ruecy/air-jordan-1-low-shoe-6Q1tFM.jpg',
                    price: 1429000,
                    stock: 50,
                    category: 'Men'
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
                    name: 'Nike Cortez G',
                    image_url: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/jk6pwv5o9uos8n2ruecy/air-jordan-1-low-shoe-6Q1tFM.jpg',
                    price: 929000,
                    stock: 10,
                    category: 'Women'
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
                name: 'Converse Chuck Taylor All Star',
                image_url: 'https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw7306ff94/images/a_107/M7650_A_107X1.jpg?sw=964',
                price: 629000,
                stock: 150,
                category: 'Men',
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Adidas Ultraboost 20',
                image_url: 'https://static.shop.adidas.co.id/media/catalog/product/cache/2/small_image/250x/9df78eab33525d08d6e5fb8d27136e95/E/G/EG1342_SL_eCom.jpg',
                price: 3000000,
                stock: 35,
                category: 'Men',
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
                    name: 'Nike Air Jordan 2 Low',
                    image_url: 'https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw7306ff94/images/a_107/M7650_A_107X1.jpg?sw=964',
                    price: 1429000,
                    stock: 100
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
                name: 'Converse Chuck Taylor All Star',
                image_url: 'https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw7306ff94/images/a_107/M7650_A_107X1.jpg?sw=964',
                price: 629000,
                stock: 150,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Adidas Ultraboost 20',
                image_url: 'https://static.shop.adidas.co.id/media/catalog/product/cache/2/small_image/250x/9df78eab33525d08d6e5fb8d27136e95/E/G/EG1342_SL_eCom.jpg',
                price: 3000000,
                stock: 35,
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