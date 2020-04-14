const Controller = require('../controller/controller')
const app = require('../app')
const request = require('supertest')
const {sequelize} = require('../models')
const {queryInterface} = sequelize


describe('Product Routes', () => {
    // afterAll((done) => {
    //     queryInterface.bulkDelete('Products', {})
    //         .then(function() {
    //             done()
    //         })
    //         .catch(function(err) {
    //             done(err)
    //         })
    // });

    describe('Testing Add Product Success', () => {
        test('Should return with status code 201 and object ', (done) => {
            request(app)
                .post('/product/')
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlc3RpbmcxMjNAbWFpbC5jb20iLCJpZCI6MjYsImlhdCI6MTU4NjgzNzgzOH0.Hq75uJGJrIXQ7c0hfNPuPdH1adLfVAwKsW9Te9oFLCU')
                .send({
                    Name: 'test',
                    Image_Url: 'testingImageUrl',
                    Stock: 299,
                    Price: 300
                })
                .end(function(err, res) {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('Name', 'test')
                    expect(res.body).toHaveProperty('Image_Url', 'testingImageUrl')
                    expect(res.body).toHaveProperty('Stock', 299)
                    expect(res.body).toHaveProperty('Price', 300)
                    expect(res.status).toBe(201)
                    done()
                })
        });
    });

    describe('Test Add Duplicate Item', () => {
        test('Should regurn with Status Code 400 And Object', (done) => {
            request(app)
                .post('/product/')
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlc3RpbmcxMjNAbWFpbC5jb20iLCJpZCI6MjYsImlhdCI6MTU4NjgzNzgzOH0.Hq75uJGJrIXQ7c0hfNPuPdH1adLfVAwKsW9Te9oFLCU')
                .send({
                    Name: 'test',
                    Image_Url: 'testingImageUrl',
                    Stock: 299,
                    Price: 300
                })
                .end(function(err, res) {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('message', 'Item With The Same Name Already Exist')
                    expect(res.status).toBe(400)
                    done()
                })
        });
    });

    describe('Testing Add Product Failed #1(No Name)', () => {
        test('Should return with status Code 400 and Object', (done) => {
            request(app)
                .post('/product/')
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlc3RpbmcxMjNAbWFpbC5jb20iLCJpZCI6MjYsImlhdCI6MTU4NjgzNzgzOH0.Hq75uJGJrIXQ7c0hfNPuPdH1adLfVAwKsW9Te9oFLCU')
                .send({
                    Image_Url: 'testingImageUrl',
                    Stock: 299,
                    Price: 300
                })
                .end(function(err, res) {
                    expect(err).toBe(null)
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty('message', 'WHERE parameter \"Name\" has invalid \"undefined\" value')
                    done()
                })
        });
        
    });

    describe('Testing Add Product Failed #2(No Image_Url)', () => {
        test('Should Return with status code 400 and object', (done) => {
            request(app)
                .post('/product/')
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlc3RpbmcxMjNAbWFpbC5jb20iLCJpZCI6MjYsImlhdCI6MTU4NjgzNzgzOH0.Hq75uJGJrIXQ7c0hfNPuPdH1adLfVAwKsW9Te9oFLCU')
                .send({
                    Name: 'Item',
                    Stock: 299,
                    Price: 300
                })
                .end(function(err, res) {
                    expect(err).toBe(null)
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty('message', 'Bad Request')
                    expect(res.body).toHaveProperty('errors', ["Product.Image_Url cannot be null"])
                    done()
                })
        });
    });

    describe('Testing Add Product Failed #2(No Stock)', () => {
        test('Should Return with status code 400 and object', (done) => {
            request(app)
                .post('/product/')
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlc3RpbmcxMjNAbWFpbC5jb20iLCJpZCI6MjYsImlhdCI6MTU4NjgzNzgzOH0.Hq75uJGJrIXQ7c0hfNPuPdH1adLfVAwKsW9Te9oFLCU')
                .send({
                    Name: 'Item0011',
                    Image_Url: 'testingImageUrl',
                    Price: 300
                })
                .end(function(err, res) {
                    expect(err).toBe(null)
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty('message', 'Bad Request')
                    expect(res.body).toHaveProperty('errors', ["Product.Stock cannot be null"])
                    done()
                })
        });
    });

    describe('Testing Add Product Failed #2(No Price)', () => {
        test('Should Return with status code 400 and object', (done) => {
            request(app)
                .post('/product/')
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlc3RpbmcxMjNAbWFpbC5jb20iLCJpZCI6MjYsImlhdCI6MTU4NjgzNzgzOH0.Hq75uJGJrIXQ7c0hfNPuPdH1adLfVAwKsW9Te9oFLCU')
                .send({
                    Name: 'Item02',
                    Image_Url: 'testingImageUrl',
                    Stock: 300
                })
                .end(function(err, res) {
                    expect(err).toBe(null)
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty('message', 'Bad Request')
                    expect(res.body).toHaveProperty('errors', ["Product.Price cannot be null"])
                    done()
                })
        });
    });
    //ADD TEST DONE
    describe('Testing Update Product', () => {
        test('Should return with Status Code 201 and Object ', (done) => {
            request(app)
                .patch('/product/1')
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlc3RpbmcxMjNAbWFpbC5jb20iLCJpZCI6MjYsImlhdCI6MTU4NjgzNzgzOH0.Hq75uJGJrIXQ7c0hfNPuPdH1adLfVAwKsW9Te9oFLCU')
                .send({
                    Name: 'UpdateItem',
                    Image_Url: 'UpdateImageUrl',
                    Price: 30000,
                    Stock: 3002
                })
                .end(function(err, res) {
                    expect(err).toBe(null)
                    expect(res.status).toBe(201)
                    expect(res.body).toHaveProperty('msg', 'Successfully Update the Product')
                    done()
                })
        });
    });

    describe('Testing Update Product #1(Not Include Name)', () => {
        test('Should return with Status Code 201 and Object ', (done) => {
            request(app)
                .patch('/product/1')
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlc3RpbmcxMjNAbWFpbC5jb20iLCJpZCI6MjYsImlhdCI6MTU4NjgzNzgzOH0.Hq75uJGJrIXQ7c0hfNPuPdH1adLfVAwKsW9Te9oFLCU')
                .send({
                    Image_Url: 'UpdateImageUrl',
                    Price: 30000,
                    Stock: 3002
                })
                .end(function(err, res) {
                    expect(err).toBe(null)
                    expect(res.status).toBe(201)
                    expect(res.body).toHaveProperty('msg', 'Successfully Update the Product')
                    done()
                })
        });
    });

    describe('Testing Update Product #2(Not Include Image_Url)', () => {
        test('Should return with Status Code 201 and Object ', (done) => {
            request(app)
                .patch('/product/1')
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlc3RpbmcxMjNAbWFpbC5jb20iLCJpZCI6MjYsImlhdCI6MTU4NjgzNzgzOH0.Hq75uJGJrIXQ7c0hfNPuPdH1adLfVAwKsW9Te9oFLCU')
                .send({
                    Name: 'UpdateItem',
                    Price: 30000,
                    Stock: 3002
                })
                .end(function(err, res) {
                    expect(err).toBe(null)
                    expect(res.status).toBe(201)
                    expect(res.body).toHaveProperty('msg', 'Successfully Update the Product')
                    done()
                })
        });
    });

    describe('Testing Update Product #3(not include Price)', () => {
        test('Should return with Status Code 201 and Object ', (done) => {
            request(app)
                .patch('/product/1')
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlc3RpbmcxMjNAbWFpbC5jb20iLCJpZCI6MjYsImlhdCI6MTU4NjgzNzgzOH0.Hq75uJGJrIXQ7c0hfNPuPdH1adLfVAwKsW9Te9oFLCU')
                .send({
                    Name: 'UpdateItem',
                    Image_Url: 'UpdateImageUrl',
                    Stock: 3002
                })
                .end(function(err, res) {
                    expect(err).toBe(null)
                    expect(res.status).toBe(201)
                    expect(res.body).toHaveProperty('msg', 'Successfully Update the Product')
                    done()
                })
        });
    });

    describe('Testing Update Product #4(Not Include Stock)', () => {
        test('Should return with Status Code 201 and Object ', (done) => {
            request(app)
                .patch('/product/1')
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlc3RpbmcxMjNAbWFpbC5jb20iLCJpZCI6MjYsImlhdCI6MTU4NjgzNzgzOH0.Hq75uJGJrIXQ7c0hfNPuPdH1adLfVAwKsW9Te9oFLCU')
                .send({
                    Name: 'UpdateItem',
                    Image_Url: 'UpdateImageUrl',
                    Price: 30000,
                })
                .end(function(err, res) {
                    expect(err).toBe(null)
                    expect(res.status).toBe(201)
                    expect(res.body).toHaveProperty('msg', 'Successfully Update the Product')
                    done()
                })
        });
    });

    describe('Testing Update Product #5(Item Not Exist)', () => {
        test('Should return with Status Code 400 and Object ', (done) => {
            request(app)
                .patch('/product/1222')
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlc3RpbmcxMjNAbWFpbC5jb20iLCJpZCI6MjYsImlhdCI6MTU4NjgzNzgzOH0.Hq75uJGJrIXQ7c0hfNPuPdH1adLfVAwKsW9Te9oFLCU')
                .send({
                    Name: 'UpdateItem',
                    Image_Url: 'UpdateImageUrl',
                    Price: 30000,
                    Stock:4000
                })
                .end(function(err, res) {
                    expect(err).toBe(null)
                    expect(res.status).toBe(400)
                    expect(res.body).toStrictEqual({"message": "Item Does Not Exist"})
                    done()
                })
        });
    });
    //Update Test Done
    describe('Testing Delete Product', () => {
        test('Should Return with Status Code 201 and Object', (done) => {
            request(app)
                .delete('/product/1')
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlc3RpbmcxMjNAbWFpbC5jb20iLCJpZCI6MjYsImlhdCI6MTU4NjgzNzgzOH0.Hq75uJGJrIXQ7c0hfNPuPdH1adLfVAwKsW9Te9oFLCU')
                .end(function(err, res) {
                    expect(err).toBe(null)
                    expect(res.status).toBe(201)
                    expect(res.body).toHaveProperty('msg', "Successfully Deleted the Product")
                    done()
                })
        });
    });

    describe('Testing Delete Product #1(not match req params.id', () => {
        test('Should Return with Status Code 400 and Object', (done) => {
            request(app)
                .delete('/product/12222')
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlc3RpbmcxMjNAbWFpbC5jb20iLCJpZCI6MjYsImlhdCI6MTU4NjgzNzgzOH0.Hq75uJGJrIXQ7c0hfNPuPdH1adLfVAwKsW9Te9oFLCU')
                .end(function(err, res) {
                    expect(err).toBe(null)
                    expect(res.status).toBe(400)
                    expect(res.body).toStrictEqual({"message": "Item Does Not Exist"})
                    done()
                })
        });
    });



});