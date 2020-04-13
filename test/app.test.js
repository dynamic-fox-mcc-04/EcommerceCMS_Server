const app = require('../app')
const request = require('supertest')


describe('User service' , () => {
    describe('success login', () => {
        describe('POST /login', ()=>{
            test('shoud return 200 with access token and status 200', (done)=> {
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
});