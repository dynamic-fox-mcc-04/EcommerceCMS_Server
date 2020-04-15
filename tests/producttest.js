const { app } = require("../app")
const request = require("supertest")
const { sequelize } = require("../models")
const { queryInterface } = sequelize
const { getToken } = require("../helpers/jwt")
const { User } = require("../models/index")


afterAll((done) => {
    queryInterface.bulkDelete('Products')
        .then(() => {
            console.log('db restored')
            return done()
        })
        .catch(err => done(err))
})
// let access_token =

// console.log('ini', access_token)


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
                    let access_token = getToken(payload)
                    request(app)
                        .post('/products')
                        .set('x-access-token', access_token)
                        .send(inputProducts)
                        .end((err, res) => {
                            if (err) {
                                return done(err)
                            } else {
                                expect(res.status).toBe(201)
                                expect(res.body).toHaveProperty('id', expect.any(Number))
                                // expect(res.body).toHaveProperty('email', inputRegister.email)
                                // expect(res.body).not.toHaveProperty('password')
                                return done()
                            }
                        })
                })
                // .catch(err => done(err))
            })
        })
    })
})