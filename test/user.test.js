const request = require('supertest')
const app = require('../app')


// '/LOGIN' | Successful login case 
describe ( 'User service ', () => { 
    describe('successful login response', () => {
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

// '/LOGIN' | Error login case -- Missing email and password 

describe('error login', ()=>{
    describe('POST/login', () =>{
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
                        expect(response.body.errors).toEqual(
                            expect.arrayContaining([
                                expect.objectContaining({message: 'Email is required'}),
                                expect.objectContaining({message: 'Password is required'})
                            ])
                        )
                        return done()
                    }
                })
        })
    })
})

// '/LOGIN' | Error login case -- Wrong Password

describe('error login', ()=>{
    describe('POST/login', () =>{
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
                        /*
                        expect(users).toEqual(
                            expect.arrayContaining([
                            expect.objectContaining({id: 1}),
                            expect.objectContaining({id: 2})
                            ])
                        );
                        */
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('errors', errors)
                        //masih kurang spesifik, kamu harus cek apakah error message-nya sudah "Invalid email/password"
                        expect(response.body.errors).toEqual(
                            expect.arrayContaining([
                                expect.objectContaining({message: "Invalid email/password"})
                            ])
                        ) 
                        return done()
                    }
                })
        })
    })
})


// '/LOGIN' | Error in log in process -- Wrong Email

describe('error login', ()=>{
    describe('POST/login', () =>{
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
                        //lebih spesifik
                        expect(response.body.errors).toEqual(
                            expect.arrayContaining([
                                expect.objectContaining({message: "Invalid email/password"})
                            ])
                        )
                        return done()
                    }
                })
        })
    })
})