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
              console.log(response.body)
              return done();
            }
          })
      })
    })
  })
  describe('failed sign in',()=> {
    describe('POST /signin',()=> {
      test('should send status 400 because invalid email or password',(done)=> {
        const userInput={
          email:'fauzan@mail.com',
          password:'tes125'
        }
        const errors=[
          {
            message: 'Invalid email or password'
          }
        ]
        request(app)
        .post('/admin/signin')
        .send(userInput)
        .end((err, response)=> {
          if(err){
            return done(err)
          } else{
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('errors', errors);
            return done()
          }
        })
      })
    })
  })
})