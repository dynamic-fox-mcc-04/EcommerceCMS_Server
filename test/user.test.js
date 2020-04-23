const UserController = require('../controller/usercontroller')
const app = require('../app')
const request = require('supertest')
const {sequelize} = require('../models')
const {queryInterface} = sequelize

let data = {
    Email: 'testing@mail.com',
    Password: 'tralala'
}

describe('User Routes', function() {
    // Untuk Login Testing Matikan After Each 
    afterAll((done) => {
        queryInterface.bulkDelete('Users', {})
            .then(function() {
                done()
            })
            .catch(function(err) {
                done(err)
            })
    });

    describe('Test Register', () => {
        test('Test Post Register Success', (done) => {
            request(app)
                .post("/user/register")
                .send(data)
                .end(function(err, res) {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('Email', data.Email)
                    expect(res.status).toBe(201)
                    done()
                })
        });
    });

    

    describe('Register Without Email', () => {
        test('Should Send An Object With Status Code 400', (done) => {
            let dataNoEmail = {...data}
            delete dataNoEmail.Email

            request(app)
                .post('/user/register')
                .send({
                    Password: 'tralalal'
                })
                .end(function(err, res) {
                    expect(err).toBe(null)
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty('message', "WHERE parameter \"Email\" has invalid \"undefined\" value")
                    done()
                })
        });
    });

    describe('Register Without Password', () => {
        test('Should Send An Object with Status Code 400', (done) => {
            let dataNoPassword = {...data}
            delete dataNoPassword.Password

            request(app)
                .post('/user/register')
                .send({
                    Email: 'testing2@mail.com',
                    
                })
                .end(function(err, res) {
                    expect(err).toBe(null)
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty('message', 'Bad Request')
                    expect(res.body).toHaveProperty('errors', ["Does Not Accept Null Value"])
                    done()
                })
            
        });
    });

    describe('Register Without Email Format', () => {
        test('Should Send Object with Status Code 400', (done) => {
            request(app)
                .post('/user/register')
                .send({
                    Email: 'testing',
                    Password: 'tralala'
                })
                .end(function(err, res) {
                    expect(err).toBe(null)
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty('message', "Bad Request")
                    expect(res.body).toHaveProperty('errors', ["Must Be Filled in Email Format"])
                    done()
                })
            
        });        
    });

    describe('Test Post Login Success', () => {
        test('Should Send Object with Status Code 200', (done) => {
            request(app)
                .post('/user/login')
                .send({
                    Email: 'testing@mail.com',
                    Password: 'tralala'
                })
                .end(function(err, res) {
                    console.log(res.body)
                    expect(err).toBe(null)
                    expect(res.status).toBe(200)
                    expect(res.body).toHaveProperty('Email', 'testing@mail.com')
                    expect(res.body).toHaveProperty('access_token', expect.any(String))
                    done()
                })
            
        });
    });

    describe('Test Post Login Failed #1', () => {
        test('Should Send Object with Status Code 400', (done) => {
            request(app)
                .post('/user/login')
                .send({
                    Email: 'testing@mail.com'
                })
                .end(function(err, res) {
                    expect(err).toBe(null)
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty('message', "Illegal arguments: undefined, string")
                    done()
                })
        });
        
    });

    describe('Test Post Login Failed #2', () => {
        test('Should Send Object with Status Code 400', (done) => {
            request(app)
                .post('/user/login')
                .send({
                    Password: 'tralala'
                })
                .end(function(err, res) {
                    expect(err).toBe(null)
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty('message', "WHERE parameter \"Email\" has invalid \"undefined\" value")
                    done()
                })
        });
        
    });

    describe('Test Post Login Failed #3', () => {
        test('Should Send Object with Status Code 400', (done) => {
            request(app)
                .post('/user/login')
                .send({
                    Email: 'testing',
                    Password: 'tralala'
                })
                .end(function(err, res) {
                    expect(err).toBe(null)
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty('message', "Wrong Email / Password")
                    done()
                })
        });
        
    });
})