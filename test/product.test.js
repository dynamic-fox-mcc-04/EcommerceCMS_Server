const app = require('../app')
const request = require('supertest')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

afterAll(() => {
    queryInterface.bulkDelete('Products')
    .then(() => {
        console.log('db clean up');
        
    })
})


describe('Product Service', () => {
    describe('success create', ()=>{
        describe('POST /products', ()=>{
            test('should return success message and status 201', (done) => {
                const data = {
                    name : "molto",
                    image_url : "https://dummyimage.com/300",
                    price : 10000,
                    stock : 50
                }

                request(app)
                .post('/products')
                .send(data)
                .end((err, response) => {

                    if (err) {
                        return done(err)
                    } else {

                        expect(response.status).toBe(201)
                        expect(response.body).toHaveProperty('message', 'Success create product')
                        return done()
                    }
                })

            })
        })
    })

    describe('Error create products', ()=>{
        describe('POST /products', ()=>{
            test('should return multiple error when all input is empty and give status 500', (done)=>{

                const data = {
                    name : "",
                    image_url : "",
                    price : "",
                    stock : ""
                }

                const errors = [
                    {
                        message : 'Name cannot be null'
                    },
                    {
                        message : 'must Url format (http://foo.com)'
                    },
                    {
                        message :  'Image_url cannot be null'
                    },
                    {
                        message :  'Price cannot be null'
                    },
                    {
                        message :  'Price must be a number'
                    },
                    {
                        message :  'Stock cannot be null'
                    },
                    {
                        message :  'Stock must be a number'
                    },
                ]

                request(app)
                .post('/products')
                .send(data)
                .end((err, response) => {

                    if (err) {
                        return done(err)
                    } else {

                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('errors', errors)
                        return done()
                    }
                })

            })
        })

    })
})