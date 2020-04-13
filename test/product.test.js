const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

// const dataProduct={
//             name : req.body.name,
//             image_url:req.body.image_url,
//             price: req.body.price,
//             stock: req.body.stock
// }

afterAll(done => {
  queryInterface
    .bulkDelete('Products')
    .then(() => {
      console.log('Db clean up');
      done();
    })
    .catch(err => {
      console.log(err);
      done(err);
    });
});

beforeAll(done => {
  
  queryInterface
    .bulkInsert('Products', [
      {
        email: admin.email,
        password: adminHashPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
    .then(() => {
      console.log('Product created: ' + admin.email);
      done();
    })
    .catch(err => {
      done(err);
    });
});

describe('Product', () => {
  describe('POST /', () => {
    describe('success add product', () => {
      test('should send an object with product detail', done => {
        const newProduct={
          name : "Minyak goreng",
          image_url:"test",
          price: 15000,
          stock: 10
}
        request(app)
          .post('/product')
          .send(newProduct)
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              expect(response.status).toBe(201);
              expect(response.body).toHaveProperty('id', expect.any(Number));
              expect(response.body).toHaveProperty('name', newProduct.name);
              expect(response.body).toHaveProperty('price', newProduct.price);
              expect(response.body).toHaveProperty('stock', newProduct.stock); 
              return done();
            }
          });
      });
    });
    describe('error register user', () => {
      test('should send error and status 400 because missing email and password', done => {
        const errors = [
          {
            message: 'Email is required field'
          },
          {
            message: 'Password is required field'
          }
        ];
        request(app)
          .post('/register')
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              expect(response.status).toBe(400);
              expect(response.body).toHaveProperty('errors', errors);
              return done();
            }
          });
      });
      test('should send error and status 400 because password less than 6 characters', done => {
        const userInput = {
          email: 'mail@mail.com',
          password: 'qwe'
        };
        const errors = [
          {
            message: 'Password at least have 6 characters'
          }
        ];
        request(app)
          .post('/register')
          .send(userInput)
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              expect(response.status).toBe(400);
              expect(response.body).toHaveProperty('errors', errors);
              return done();
            }
          });
      });
      test('should send error and status 400 because email already exists.', done => {
        const errors = [
          {
            message: 'Email already exists.'
          }
        ];
        request(app)
          .post('/register')
          .send(user1)
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              console.log(response.body);
              expect(response.status).toBe(400);
              expect(response.body).toHaveProperty('errors', errors);
              return done();
            }
          });
      });
    });
  });
  describe('POST /login', () => {
    describe('success login', () => {
      test('should send access token and status 200', done => {
        request(app)
          .post('/login')
          .send(user1)
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              expect(response.status).toBe(200);
              expect(response.body).toHaveProperty('token');
              return done();
            }
          });
      });
    });
  });
});
