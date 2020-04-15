const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const verify = require ('../helpers/jwt')
const{Product} = require('../models')


afterAll(done => {
  queryInterface
  Product.destroy({ truncate: true, restartIdentity: true })
    .then(() => {
      console.log('Db clean up');
      done();
    })
    .catch(err => {
      console.log(err);
      done(err);
    });
});

// beforeAll(done => {
  
//   queryInterface
//     .bulkInsert('Products', [
//       {
//         email: admin.email,
//         password: adminHashPassword,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       }
//     ])
//     .then(() => {
//       console.log('Product created: ' + admin.email);
//       done();
//     })
//     .catch(err => {
//       done(err);
//     });
// });
const newProduct={
  name : "Minyak goreng lagi",
  image_url:"test",
  price: 15000,
  stock: 10 }
describe('Product', () => {
  describe('POST /', () => {
    describe('success add product', () => {
      test('should send an object with product detail', done => {
        

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
    describe('error Add product', () => {
      test('should send error and status 400 because missing name,image_url,price and stock', done => {
        const errors = [
          {
            message: 'Name require'
          },
          {
            message: 'Images require'
          },
          {
            message: 'Price require'
          },
          {
            message: 'stock require'
          }

        ];
        request(app)
          .post('/product')
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
    });
      
  });
  describe('PUT /Product', () => {
    describe('Update Product', () => {
      test('should send Message and status 200', done => {
        request(app)
          .put('/product/1')
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {              
              expect(response.status).toBe(201);
              expect(response.body).toHaveProperty('msg', "Update Success");
              
              return done();
            }
          });
      });
    });
  });
  describe('Find All /Product', () => {
    describe('Find All Product', () => {
      test('should send json and status 200', done => {
        request(app)
          .get('/product')
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {              
              expect(response.status).toBe(201);
              expect(response.body).toHaveProperty('data');
              return done();
            }
          });
      });
    });
  });
  describe('DELETE /Product', () => {
    describe('Delete Product', () => {
      test('should send Message and status 200', done => {
        request(app)
          .delete('/product/1')
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {              
              expect(response.status).toBe(201);
              expect(response.body).toHaveProperty('msg', "Delete Success");
              
              return done();
            }
          });
      });
    });
  });
  
});
