// const multiply = require("../multiple")

// test('multiply 2*3 equeal 6', () => expect(multiply(2, 3)).toBe(6));

const { app } = require("../app")
const request = require("supertest")
describe('User service', () => {
    describe('success register', () => {
        describe('POST /register', () => {
            test('This should return object with id and email and status 201', () => {
                const inputRegister = {
                    email: 'mymail@mail.com',
                    password: '$2y$12$x9jnH0PcnMUSo9t72GL/u.9z4mR8hWCoYJscgzHWMf5dhwl8Xfua.' //hashed from bcrypt-generator.com
                }
                request(app)
                    .post('/register')
                    .send(inputRegister)
                    .end((err, res) => {
                        if (err) {
                            return done(err)
                        } else {
                            expect(res.status).toBe(201)
                            expect(res.body).toHaveProperty('id', expect.any(Number))
                            expect(res.body).toHaveProperty('email', inputRegister.email)
                            expect(res.body.not.toHaveProperty('password'))
                            return done()
                        }
                    })
            })
        })
    })
})