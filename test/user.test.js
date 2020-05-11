const request = require('supertest')
const app = require('../app')

describe('Admin routes', () => {
  // SIGNUP
  describe('POST /signup', () => {
    describe('success process', () => {
      test('should send an object with status code (201)', (done) => {
        let data = {
          name: 'test1',
          email: 'test3@mail.com',
          password: '123456'
        }
        request(app)
          .post('/admin/signup')
          .send(data)
          .end((err, res) => {
            if (err) {
              return done(err)
            } else {
              expect(err).toBe(null)
              expect(res.body).toHaveProperty('name', expect.any(String))
              expect(res.body).toHaveProperty('email', expect.any(String))
              expect(res.body).toHaveProperty('token', expect.any(String))
              expect(res.status).toBe(201)
              return done()
            }
          })
      })
    })

    describe('error process', () => {
      test('should be retun error status (400) of missing email', (done) => {
        let withoutEmail = {
          name: 'test1',
          password: '123456'
        }
        request(app)
          .post('/admin/signup')
          .send(withoutEmail)
          .end((err, res) => {
            if (err) {
              return done(err)
            } else {
              expect(res.body).toHaveProperty('message', 'Bad Request')
              expect(res.body).toHaveProperty('errors', expect.any(Array))
              expect(res.body.errors).toContain('email is required')
              expect(res.status).toBe(400)
              return done()
            }
          })
      })

      test('should be retun error status (400) of missing password', (done) => {
        let withoutPass = {
          name: 'test1',
          email: 'test@mail.com'
        }
        request(app)
          .post('/admin/signup')
          .send(withoutPass)
          .end((err, res) => {
            if (err) {
              return done(err)
            } else {
              expect(res.body).toHaveProperty('message', 'Bad Request')
              expect(res.body).toHaveProperty('errors', expect.any(Array))
              expect(res.body.errors).toContain('password is required')
              expect(res.status).toBe(400)
              return done()
            }
          })
      })
    })
  })

  // SIGNIN
  describe('POST /signin', () => {
    describe('success process', () => {
      test('should be send an object with status code 200', (done) => {
        let data = {
          email: 'test@mail.com',
          password: '123456'
        }
        request(app)
          .post('/admin/signin')
          .send(data)
          .end((err, res) => {
            if (err) {
              return done(err)
            } else {
              expect(err).toBe(null)
              expect(res.body).toHaveProperty('name', expect.any(String))
              expect(res.body).toHaveProperty('email', expect.any(String))
              expect(res.body).toHaveProperty('token', expect.any(String))
              expect(res.status).toBe(200)
              return done()
            }
          })
      })
    })

    describe('error process', () => {
      test('should be retun error status (400) of wrong email input', (done) => {
        let wrongEmail = {
          email: 'tester@mail.com',
          password: '123456'
        }
        request(app)
          .post('/admin/signin')
          .send(wrongEmail)
          .end((err, res) => {
            if (err) {
              return done(err)
            } else {
              expect(res.body).toHaveProperty('message', 'Bad Request')
              expect(res.body).toHaveProperty('errors', expect.any(Array))
              expect(res.body.errors).toContain('Invalid email or password')
              expect(res.status).toBe(400)
              return done()
            }
          })
      })

      test('should be retun error status (400) of wrong pasword input', (done) => {
        let wrongPass = {
          email: 'test@mail.com',
          password: '111111'
        }
        request(app)
          .post('/admin/signin')
          .send(wrongPass)
          .end((err, res) => {
            if (err) {
              return done(err)
            } else {
              expect(res.body).toHaveProperty('message', 'Bad Request')
              expect(res.body).toHaveProperty('errors', expect.any(Array))
              expect(res.body.errors).toContain('Invalid email or password')
              expect(res.status).toBe(400)
              return done()
            }
          })
      })
    })
  })
})