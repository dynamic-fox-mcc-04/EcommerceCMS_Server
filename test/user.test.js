const app = require('../app')
const request = require('supertest')


describe('User service' , () => {
    describe('success login', () => {
        describe('POST /login', ()=>{
            test('should return 200 with access token and status 200', (done)=> {
                const userInput = {
                    email : 'user@admin.com',
                    password : 'admin'
                }
                request(app)
                    .post('/login')
                    .send(userInput)
                    .end((err, response) =>{
                        if (err) {
                            return done(err);
                        } else {
                            expect(response.status).toBe(200);
                            expect(response.body).toHaveProperty('access_token', expect.any(String))
                            return done();
                        }
                })
            })
        })
        
    })

    describe('error login', () => {
        describe('POST /login', ()=> {
            test('should return error if email and password empty message and status 400', (done)=>{
                const userInput = {
                    email : '',
                    password : '',
                }

                const errors = [
                        {
                            message : 'Invalid password/email'
                        },
                    ]

                request(app)
                    .post('/login')
                    .send(userInput)
                    .end((err, response) => {

                        if (err){
                            return done(err)
                        } else {
                            expect(response.status).toBe(400)
                            expect(response.body).toHaveProperty('errors', errors)
                            expect(response.body).toHaveProperty('type', 'bad request')
                           return done()
                        }
                    })

            })
        })

    })

    describe('error login', () => {
        describe('POST /login', ()=> {
            test('should return error if email or password is wrong message and status 400', (done)=>{
                const userInput = {
                    email : 'user@admin.com',
                    password : '1234',
                }

                const errors = [
                        {
                            message : 'Invalid password/email'
                        },
                    ]

                request(app)
                    .post('/login')
                    .send(userInput)
                    .end((err, response) => {

                        if (err){
                            return done(err)
                        } else {
                            expect(response.status).toBe(400)
                            expect(response.body).toHaveProperty('errors', errors)
                            expect(response.body).toHaveProperty('type', 'bad request')
                           return done()
                        }
                    })

            })
        })

    })

});