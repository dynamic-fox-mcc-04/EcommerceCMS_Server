const request = require('supertest')
const app = require('../app')

// USER - PRODUCT TEST | Here we will test 5 functions - See all, See one, Add product, Delete product, Edit product

// PRODUCT TEST | See all -- saat kita berhasil login, kita harus pass authentication -- baru baca api get products
// Hal yang kita butuhkan untuk test adalah 
// 1. Kirimkan headers yang berisi access_token dari localStorage


// '/LOGIN' | Successful login case 
// describe ( 'User service ', () => { 
//     describe('successful login response', () => {
//         describe('POST/login', ()=>{
//             test('should return object with id and email and status 201', done => {
//                 const userinput = {
//                     email: 'andre@gmail.com',
//                     password: 'andre123'
//                 }
//                 request(app)
//                 .post('/login')
//                 .send( userinput )
//                 .end((err,response) => {
//                     if(err){
//                         return done(err)
//                     } else {
//                         request(app)
//                         .get('/products')
//                         .end((err,response) => {
//                             if(err){
//                                 return done(err)
//                             } else {
//                                 console.log('Ini res buat get', response )
//                                 // console.log('YAY MASUK GET ALL')
//                                 expect(response.status).toBe(200)
//                                 expect(response.body).toHaveProperty( 'products', result)
//                                 return done()
//                             }
//                         })
//                     }
//                 })
//             })
//         })
//     })
// })


describe ( 'User service', () => { 
    describe('success response for looking at complete product list', () => {
        describe('GET /products', ()=>{
            test('should return an object of products, containing array of product objects, with status 200', done => {
                request(app)
                .get('/products')
                .set({access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbmRyZUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTU4NzE5Mjg2M30.6OP5EETyZSdBQF0NskJYIRL52RK8hVu1rOQEhPmbYgc'})
                .end((err,response) => {
                    if(err){
                        return done(err)
                    } else {
                        //currently it says cnanot get /products
                        //content of response is incredibly wrong
                        console.log(response.error)
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('products', result)
                        return done()
                    }
                })
            })
        })
    })
})