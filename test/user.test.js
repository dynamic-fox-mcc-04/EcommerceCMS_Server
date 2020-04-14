const request = require('supertest')
const app = require('../app')


// '/LOGIN' | Success Register 
describe ( 'User service ', () => { 
    describe('success register response', () => {
        describe('POST/login', ()=>{
            test('should return object with id and email and status 201', done => {
                const userinput = {
                    email: 'archie@gmail.com',
                    password: 'archie123'
                }
                request(app)
                .post('/login')
                .send( userinput )
                .end((err,response) => {
                    if(err){
                        return done(err)
                    } else {
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty( 'id' ), expect.any(Number)
                        expect(response.body).toHaveProperty( 'email', userinput.email)
                        expect(response.body).not.toHaveProperty('password')
                        return done()
                    }
                })
            })
        })
    })
})

// '/LOGIN' | Error Register 

describe('error register', ()=>{
    describe('POST/register', () =>{
        test('should return error with status 500 because missing email and password', done =>{
            const errors = [{
                message: 'Email is required'
            }, {
                message: 'Password is required'
            }]
            request (app)
                .post('/login')
                .send()
                .end( (err, response) =>{
                    if (err) {
                        console.log(err)
                        return done(err)
                    } else {
                        expect(response.status).toBe(500)
                        expect(response.body).toHaveProperty('errors', errors)
                        return done()
                    }
                })
        })
    })
})

// '/LOGIN' | Error Register -- Wrong Password

describe('error register', ()=>{
    describe('POST/register', () =>{
        test('should return error with status 400 due to wrong password', done =>{
            const errors = [{
                message: "Invalid email/password"
            }]  
            const userinput = {
                email: 'archie@gmail.com',
                password: 'qweqwe'
            }
            request (app)
                .post('/login')
                .send(userinput)
                .end( (err, response) =>{
                    if (err) {
                        console.log(err)
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


// '/LOGIN' | Error Register -- Wrong Password

describe('error register', ()=>{
    describe('POST/register', () =>{
        test('should return error with status 400 due to unregistered email', done =>{
            const errors = [{
                message: "Invalid email/password"
            }]  
            const userinput = {
                email: 'e@gmail.com',
                password: 'archie123'
            }
            request (app)
                .post('/login')
                .send(userinput)
                .end( (err, response) =>{
                    if (err) {
                        console.log(err)
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