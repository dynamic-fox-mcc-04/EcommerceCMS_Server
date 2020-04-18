const app = require('../app.js')
const request = require('supertest')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

afterAll(() => {
  queryInterface.bulkDelete('Users')
    .then(() => {
      done()
    })
    .catch((err) => {
      done(err)
    })
})

describe('User service', () => { //block testing untuk test /suatu penanda
  describe('seccess response', () => {
    describe('POST/user/register', () => {
      test('shoud return id and email and status 201', (done) => {
        const user = {
          email: 'ardi@mail.com',
          password: '123',
          level: 1
        }
        request(app)
          .post('/user/register')
          .send(user)
          .end((err, response) => {
            if (err) {
              return done(err)
            } else {
              expect(response.status).toBe(201)
              expect(response.body).toHaveProperty('id', expect.any(Number))
              expect(response.body).toHaveProperty('email', user.email)
              expect(response.body).not.toHaveProperty('password')
              return done()
            }
          })
      })
    })
  })

  describe('error register', () => {
    describe('POST /user/register ', () => {
      test('shound return err with status 400 because some empty data send', (done) => {
        const error = [
          {
            message: 'Email is required'
          }
        ]
        request(app)
          .post('/user/register')
          .end((err, response) => {
            if (err) {
              return done(err)
            } else {
              expect(response.status).toBe(400)
              // expect(response.body).toHaveProperty('error', expect.any(Number))
              return done()
            }
          })
      })
    })
  })
})