const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const { getToken } = require('../helpers/jwt');
const { User } = require('../models');

let token

describe('Product routes', () => {
  beforeAll((done) => {
    User.create({
      name: 'tester',
      email: 'test@test.com',
      password: '123456',
      admin: true
    })
      .then(newUser => {
        token = getToken({ id: newUser.id, email: newUser.email })
        done()
      })
      .catch(err => {
        console.log(err);
      })
  })
  afterAll((done) => {
    // queryInterface.bulkDelete('Products', {})
    queryInterface.bulkDelete('Users', {})
      // .then(_ => {
      //   return queryInterface.bulkDelete('Users', {})
      // })
      .then(_ => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  // CREATE
  describe('POST /product', () => {
    describe('success process', () => {
      test('should return an object with status code 201', (done) => {
        let data = {
          name: 'test',
          price: 1,
          stock: 1,
          image_Url: 'https://www.archute.com/wp-content/themes/fox/images/placeholder.jpg',
          category: 'test'
        }
        request(app)
          .post('/product')
          .set('token', token)
          .send(data)
          .end((err, res) => {
            if (err) {
              return done(err)
            } else {
              expect(err).toBe(null)
              expect(res.body).toHaveProperty('name', expect.any(String))
              expect(res.body).toHaveProperty('price', expect.any(Number))
              expect(res.body).toHaveProperty('stock', expect.any(Number))
              expect(res.body).toHaveProperty('image_Url', expect.any(String))
              expect(res.body).toHaveProperty('category', expect.any(String))
              expect(res.status).toBe(201)
              return done()
            }
          })
      })
    })
  })

  // DISPLAY
  describe('GET /product', () => {
    beforeEach((done) => {
      queryInterface.bulkInsert('Products', [{
        name: 'test',
        price: 1,
        stock: 1,
        image_Url: 'https://www.archute.com/wp-content/themes/fox/images/placeholder.jpg',
        category: 'test',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'test 2',
        price: 1,
        stock: 1,
        image_Url: 'https://www.archute.com/wp-content/themes/fox/images/placeholder.jpg',
        category: 'test',
        createdAt: new Date(),
        updatedAt: new Date()
      }])
        .then(_ => {
          done()
        })
        .catch(err => {
          done(err)
        })
    })
    describe('success process', () => {
      test('should return an array of object from product with status code 200', (done) => {
        request(app)
          .get('/product')
          .set('token', token)
          .end((err, res) => {
            if (err) {
              return done(err)
            } else {
              expect(err).toBe(null)
              expect.any(Array)
              expect(res.status).toBe(200)
              return done()
            }
          })
      })
    })
  })
})