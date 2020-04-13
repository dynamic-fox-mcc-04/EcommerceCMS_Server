const app = require('../app')
const request = require('supertest')


describe('Admin service', ()=> {
     describe('success login', ()=> {
         describe('POST/login', ()=> {
             test('should return object with id and email and status 200', (done)=> {
                const userinput = {
                    email: 'test@mail.com',
                    password: 'qwerty123'
                }
                request(app)
                 .post('/login')
                 .send(userinput)
                 .end((err, res)=> {
                     if(err){
                         return done(err)
                     }
                     else {
                         expect(res.status).toBe(200);
                         expect(res.body).toHaveProperty('id', expect.any(Number));
                         expect(res.body).toHaveProperty('email', userinput.email);
                         expect(res.body).not.toHaveProperty('password');
                         return done()
                     }
                 })
             })
         })
     })
})