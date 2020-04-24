const app = require('../app')
const request = require('supertest')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

let dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU4NjgzNDUyM30.ZYBaZhdNmvyFOFrELf_f-3ibObI--MUW6Ov5cxH9j8g'

afterAll(() => {
    queryInterface.bulkDelete('Products', null, {})
    console.log('db clean up');
    
})


describe('Product Service', () => {
    describe('success create', ()=>{
        describe('POST /products', ()=>{
            test('should return success message and status 201 with token', (done) => {
                const data = {
                    name : "molto",
                    image_url : "https://dummyimage.com/300",
                    price : 10000,
                    stock : 50
                }

                request(app)
                .post('/products')
                .set('access_token', dummyToken)
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
            test('should return error when name is null and give status 400 with token', (done)=>{
                const data = {
                    name : "",
                    image_url : "https://dummyimage.com/300",
                    price : 10000,
                    stock : 50
                }

                const errors = [
                    {
                        message : 'Name cannot be null'
                    }
                ]

                request(app)
                .post('/products')
                .set('access_token', dummyToken)
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

            test('should return error when image_url is null and give status 400 with token', (done)=>{
                const data = {
                    name : "molto",
                    image_url : "",
                    price : 10000,
                    stock : 50
                }

                const errors = [
                    {
                        message : 'must Url format (http://foo.com)'
                    },
                    {
                        message :  'Image_url cannot be null'
                    },
                ]

                request(app)
                .post('/products')
                .set('access_token', dummyToken)
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

            test('should return error when price is null and give status 400 with token', (done)=>{
                const data = {
                    name : "molto",
                    image_url : "https://dummyimage.com/300",
                    price : "",
                    stock : 50
                }

                const errors = [
                    {
                        message :  'Price cannot be null'
                    },
                    {
                        message :  'Price must be a number'
                    },
                ]

                request(app)
                .post('/products')
                .set('access_token', dummyToken)
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

            test('should return error when stock is null and give status 400 with token', (done)=>{
                const data = {
                    name : "molto",
                    image_url : "https://dummyimage.com/300",
                    price : 10000,
                    stock : ""
                }

                const errors = [
                    {
                        message :  'Stock cannot be null'
                    },
                    {
                        message :  'Stock must be a number'
                    },
                ]

                request(app)
                .post('/products')
                .set('access_token', dummyToken)
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

        describe('POST /products', ()=>{
            test('should return errors when price are negative value and give status 400 with token', (done)=>{
                const data = {
                    name : "molto",
                    image_url : "https://dummyimage.com/300",
                    price : -10000,
                    stock : 50
                }

                const errors = [
                    {
                        message : 'Price must greater than or equal to 0'
                    },
                ]

                request(app)
                .post('/products')
                .set('access_token', dummyToken)
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

            test('should return errors when price are negative value and give status 400 with token', (done)=>{
                const data = {
                    name : "molto",
                    image_url : "https://dummyimage.com/300",
                    price : 10000,
                    stock : -50
                }

                const errors = [
                    {
                        message : 'Stock must greater than or equal to 0'
                    },
                ]

                request(app)
                .post('/products')
                .set('access_token', dummyToken)
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

        describe('POST /products', ()=>{
            test('should return errors because token not exist', (done)=>{
                const data = {
                    name : "molto",
                    image_url : "https://dummyimage.com/300",
                    price : 10000,
                    stock : 50
                }

                const errors = [
                    {
                        message : 'Request Token'
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