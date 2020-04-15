Title

Register

URL

"/user/register"

Method:

POST

URL Params


Required:


Optional:


Data Params

Body : {
    Email: String,
    Password: String
}

Success Response:


Code: 201 CREATED
Content: { 
    Email : Number,
    msg: 'Register Success'
 }


Error Response:

Code: 400 Bad Request
Content: { Message : "Error Message" }
OR



Notes:

______________________________________________________________________________________
Title

Login

URL

"/user/login"

Method:

POST

URL Params


Required:


Optional:


Data Params

Body : {
    Email: String,
    Password: String
}

Success Response:


Code: 201 CREATED
Content: { 
    Email : Number,
    access_token: 'Register Success'
 }


Error Response:

Code: 400 Bad Request
Content: { Message : "Error Message" }
OR



Notes:

______________________________________________________________________________________