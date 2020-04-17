const app = require("../app");
const request = require("supertest");

describe("User Service", () =>
{
    describe("Success register", () =>
    {
        test(`Return message "User Created"`, (done) =>
        {
            const input = {
                name : "iqbal",
                email : "iqbal@mail.com",
                password : "123"
            }
            request(app)
                .post("/register")
                .send(input)
                .end((err, res) =>
                {
                    if (err) {
                        return done(err);
                      }

                    expect(201);
                    expect({message : "User created"});
                    return done();
                })
        })
    });
    describe("Success Login", () =>
    {
        test(`Return token`, (done) =>
        {
            const input = {
                email : "iqbal@mail.com",
                password : "123"
            }
            request(app)
                .post("/login")
                .send(input)
                .end((err, res) =>
                {
                    if (err) {
                        return done(err);
                      }

                    expect(200);
                    expect(res.body).toHaveProperty("token");
                    return done();
                })
        })
    })
})