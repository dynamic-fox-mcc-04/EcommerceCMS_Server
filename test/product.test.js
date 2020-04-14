const app= require('../app')
const request= require('supertest')

describe('product test',()=>{
    describe('success create', ()=>{
        describe('POST /create',()=>{
            test('should send status 201 and object with name, image_url, price, stock',(done)=>{
                const productInput={
                    name:'note10',
                    image_url:'note10.png',
                    price:10000000,
                    stock:1
                }
                request(app)
                .post('/product')
                .set('access_token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AbWFpbC5jb20iLCJpYXQiOjE1ODY4NTExNjF9.I3kVebpFUQX-MOzQkr2KH6Irg4d5-Iqvunrr0nqAWkM')
                .send(productInput)
                .end((err, response)=> {
                    if(err){
                        return done(err)
                    } else {
                        expect(response.status).toBe(201)
                        expect(response.body).toHaveProperty('name',productInput.name)
                        expect(response.body).toHaveProperty('image_url',productInput.image_url)
                        expect(response.body).toHaveProperty('price',productInput.price)
                        expect(response.body).toHaveProperty('stock',productInput.stock)
                        done()
                    }
                })
            })
        })
    })
    describe('failed create',()=>{
        describe('POST /create',()=>{
            test('should send status 400 because null value of name and image_url',(done)=>{
                const productInput= {
                    price:10000000,
                    stock:1
                }
                const errors=[
                    {
                        message:'Name cannot null'
                    },
                    {
                        message:'image_url cannot null'
                    }
                ]
                request(app)
                .post('/product')
                .set('access_token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AbWFpbC5jb20iLCJpYXQiOjE1ODY4NTExNjF9.I3kVebpFUQX-MOzQkr2KH6Irg4d5-Iqvunrr0nqAWkM')
                .send(productInput)
                .end((err,response)=> {
                    if(err){
                        return done(err)
                    } else {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('errors',errors)
                        done()
                    }
                })
            })
            test('should send status 400 because empty value of name, image_url, price and stock',(done)=>{
                const productInput= {
                    name:'',
                    image_url:'',
                    price:'',
                    stock:''
                }
                const errors=[
                    {
                        message:'Please insert name field'
                    },
                    {
                        message:'Please insert image_url field'
                    },
                    {
                        message:'Please insert price field'
                    },
                    {
                        message:'Please insert stock quantity'
                    }
                ]
                request(app)
                .post('/product')
                .set('access_token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AbWFpbC5jb20iLCJpYXQiOjE1ODY4NTExNjF9.I3kVebpFUQX-MOzQkr2KH6Irg4d5-Iqvunrr0nqAWkM')
                .send(productInput)
                .end((err,response)=> {
                    if(err){
                        return done(err)
                    } else {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('errors',errors)
                        done()
                    }
                })
            })
            test('should send status 400 because of price and stock minus value',(done)=> {
                const productInput= {
                    name:'asus rog',
                    image_url:'rog.png',
                    price:-10000,
                    stock:-1
                }
                const errors=[
                    {
                        message:'Price cannot be minus'
                    },
                    {
                        message:'Stock cannot be minus'
                    }
                ]
                request(app)
                .post('/product')
                .set('access_token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AbWFpbC5jb20iLCJpYXQiOjE1ODY4NTExNjF9.I3kVebpFUQX-MOzQkr2KH6Irg4d5-Iqvunrr0nqAWkM')
                .send(productInput)
                .end((err,response)=> {
                    if(err){
                        return done(err)
                    } else {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('errors',errors)
                        done()
                    }
                })
            })
        })
    })
    describe('success update',()=> {
        describe('PUT /product/:id',()=> {
            test('should send status 200 and object with name, image_url, price and stock ',(done)=> {
                const productInput={
                    name:'note10',
                    image_url:'note10.png',
                    price:10000000,
                    stock:1
                }
                request(app)
                .put('/product/1')
                .set('access_token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AbWFpbC5jb20iLCJpYXQiOjE1ODY4NTExNjF9.I3kVebpFUQX-MOzQkr2KH6Irg4d5-Iqvunrr0nqAWkM')
                .send(productInput)
                .end((err, response)=> {
                    if(err){
                        return done(err)
                    } else {
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('name',productInput.name)
                        expect(response.body).toHaveProperty('image_url',productInput.image_url)
                        expect(response.body).toHaveProperty('price',productInput.price)
                        expect(response.body).toHaveProperty('stock',productInput.stock)
                        done()
                    }
                })
            })
        })
    })
    describe('failed update',()=> {
        describe('PUT /product/:id',()=> {
            test('should send status 400 because of price and stock minus value',(done)=> {
                const productInput= {
                    name:'asus rog',
                    image_url:'rog.png',
                    price:-10000,
                    stock:-1
                }
                const errors=[
                    {
                        message:'Price cannot be minus'
                    },
                    {
                        message:'Stock cannot be minus'
                    }
                ]
                request(app)
                .put('/product/1')
                .set('access_token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AbWFpbC5jb20iLCJpYXQiOjE1ODY4NTExNjF9.I3kVebpFUQX-MOzQkr2KH6Irg4d5-Iqvunrr0nqAWkM')
                .send(productInput)
                .end((err,response)=> {
                    if(err){
                        return done(err)
                    } else {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('errors',errors)
                        done()
                    }
                })
            })
        })
    })
    describe('success delete product',()=> {
        describe('DELETE /product/:id',()=>{
            test('should send status 200',(done)=> {
                request(app)
                .delete('/product/1')
                .set('access_token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AbWFpbC5jb20iLCJpYXQiOjE1ODY4NTExNjF9.I3kVebpFUQX-MOzQkr2KH6Irg4d5-Iqvunrr0nqAWkM')
                .end((err, response)=> {
                    if(err){
                        return done(err)
                    } else {
                        expect(response.status).toBe(200)
                        done()
                    }
                })
            })
        })
    })
    describe('failed delete',()=> {
        describe('/DELETE /product/:id',()=>{
            test('should send status 404 because data is not found',(done)=>{
                request(app)
                .delete('/product/1')
                .set('access_token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AbWFpbC5jb20iLCJpYXQiOjE1ODY4NTExNjF9.I3kVebpFUQX-MOzQkr2KH6Irg4d5-Iqvunrr0nqAWkM')
                .end((err, response)=> {
                    if(err){
                        return done(err)
                    } else {
                        expect(response.status).toBe(404)
                        done()
                    }
                })
            })
        })
    })
    describe('success to find all the data',()=>{
        describe('GET /product',()=>{
            test('should send status 200',(done)=>{
                request(app)
                .get('/product')
                .set('access_token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AbWFpbC5jb20iLCJpYXQiOjE1ODY4NTExNjF9.I3kVebpFUQX-MOzQkr2KH6Irg4d5-Iqvunrr0nqAWkM')
                    .end((err, response)=> {
                        if(err){
                            return done(err)
                        } else {
                            expect(response.status).toBe(200)
                            done()
                        }
                    })
            })
        })
    })
})