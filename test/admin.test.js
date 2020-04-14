const app= require('../app')
const request= require('supertest')

describe('Admin service', ()=> {
  describe('success signin', ()=> {
    describe('POST /signin', ()=> {
      test('should return object with id and email and status 200',(done)=> {
        const userInput={
          email:'fauzan@mail.com',
          password:'tes12345'
        }
        request(app)
          .post('/admin/signin')
          .send(userInput)
          .end((err,response)=> {
            if(err) {
              return done(err)
            } else {
              expect(response.status).toBe(200);
              expect(response.body).toHaveProperty('id',expect.any(Number));
              expect(response.body).toHaveProperty('email',userInput.email);
              expect(response.body).toHaveProperty('access_token',expect.any(String));
              expect(response.body).not.toHaveProperty('password');
              return done();
            }
          })
      })
    })
  })
})