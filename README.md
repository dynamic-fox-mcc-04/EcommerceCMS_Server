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
Title

Fetch Product

URL

"/product/"

Method:

GET

URL Params


Required:
-access_token:string


Optional:


Data Params

Body : {
    Email: String,
    Password: String
}

Success Response:


Code: 201 CREATED
Content: {
    [
    {
        "id": 4,
        "Name": "Product 2",
        "Image_Url": "https://media.tenor.com/images/ebcdb89dd3dac8d1434c8151b6bddb16/tenor.gif",
        "Price": 22222,
        "Stock": 333,
        "createdAt": "2020-04-15T12:49:54.036Z",
        "updatedAt": "2020-04-15T12:49:54.036Z"
    },
    {
        "id": 3,
        "Name": "Produk-1",
        "Image_Url": "https://media.giphy.com/media/4D0BFNg8NIfvi/giphy.gif",
        "Price": 30000,
        "Stock": 200,
        "createdAt": "2020-04-15T12:45:59.388Z",
        "updatedAt": "2020-04-15T12:45:59.388Z"
    },
    {
        "id": 2,
        "Name": "Item-12",
        "Image_Url": "https://66.media.tumblr.com/24291384b31c1ac161abab1379af2320/9f405815309c8099-3e/s540x810/2062bd878f79111a57625d42588f0086dbe17bfa.gif",
        "Price": 0,
        "Stock": 0,
        "createdAt": "2020-04-14T06:49:42.110Z",
        "updatedAt": "2020-04-15T13:49:57.748Z"
    }
]


Error Response:

Code: 400 Bad Request
Content: { Message : "Error Message" }
OR



Notes:

______________________________________________________________________________________
Title

Fetch Product

URL

"/product/"

Method:

GET

URL Params


Required:
-access_token:string


Optional:


Data Params

Body : 

Success Response:


Code: 200 OK
Content: 
    [
    {
        "id": 4,
        "Name": "Product 2",
        "Image_Url": "https://media.tenor.com/images/ebcdb89dd3dac8d1434c8151b6bddb16/tenor.gif",
        "Price": 22222,
        "Stock": 333,
        "createdAt": "2020-04-15T12:49:54.036Z",
        "updatedAt": "2020-04-15T12:49:54.036Z"
    },
    {
        "id": 3,
        "Name": "Produk-1",
        "Image_Url": "https://media.giphy.com/media/4D0BFNg8NIfvi/giphy.gif",
        "Price": 30000,
        "Stock": 200,
        "createdAt": "2020-04-15T12:45:59.388Z",
        "updatedAt": "2020-04-15T12:45:59.388Z"
    },
    {
        "id": 2,
        "Name": "Item-12",
        "Image_Url": "https://66.media.tumblr.com/24291384b31c1ac161abab1379af2320/9f405815309c8099-3e/s540x810/2062bd878f79111a57625d42588f0086dbe17bfa.gif",
        "Price": 0,
        "Stock": 0,
        "createdAt": "2020-04-14T06:49:42.110Z",
        "updatedAt": "2020-04-15T13:49:57.748Z"
    }
]


Error Response:

Code: 400 Bad Request
Content: { message : "Error Message" }
OR



Notes:

______________________________________________________________________________________
Title

Add Product

URL

"/product/"

Method:

POST

URL Params


Required:
-access_token:string


Optional:


Data Params

Body : {
    Name:String,
    Image_Url: String,
    Stock:Integer,
    Price:Integer
}

Success Response:


Code: 201 CREATED
Content: 
{
    "Name": "Produk-A",
    "Image_Url": "Image_Url",
    "Stock": 0,
    "Price": 22
}


Error Response:

Code: 400 Bad Request
Content: { message : "Error Message" }
OR



Notes:

______________________________________________________________________________________
Title

Get Detail Product

URL

"/product/:id"

Method:

GET

URL Params


Required:
-access_token:string


Optional:


Data Params

Body : 

Success Response:


Code: 201 CREATED
Content: 
Title

Add Product

URL

"/product/"

Method:

POST

URL Params


Required:
-access_token:string


Optional:


Data Params

Body : {
    Name:String,
    Image_Url: String,
    Stock:Integer,
    Price:Integer
}

Success Response:


Code: 200 OK
Content: 
{
    "Name": "Produk-A",
    "Image_Url": "Image_Url",
    "Stock": 0,
    "Price": 22
}


Error Response:

Code: 400 Bad Request
Content: { message : "Error Message" }
OR



Notes:

______________________________________________________________________________________


Error Response:

Code: 400 Bad Request
Content: { message : "Error Message" }
OR



Notes:

______________________________________________________________________________________
Title

Update Product

URL

"/product/:id"

Method:

PATCH

URL Params
id:Integer


Required:
-access_token:string


Optional:


Data Params

Body : {
    Name:String,
    Image_Url: String,
    Stock:Integer,
    Price:Integer
}

Success Response:


Code: 201 CREATED
Content: 
{
    "msg": "Successfully Update the Product"
}


Error Response:

Code: 400 Bad Request
Content: { message : "Error Message" }
OR



Notes:

______________________________________________________________________________________
Title

Delete Product

URL

"/product/:id"

Method:

DELETE

URL Params
id:Integer


Required:
-access_token:string


Optional:


Data Params

Body : 

Success Response:


Code: 201 CREATED
Content: 
{
    "msg": "Successfully Deleted the Product"
}


Error Response:

Code: 400 Bad Request
Content: { message : "Error Message" }
OR



Notes:

______________________________________________________________________________________
Title

Get Cart

URL

"/cart"

Method:

GET

URL Params
id:Integer


Required:
-access_token:string


Optional:


Data Params

Body : 

Success Response:


Code: 200 OK
Content: 
[
    {
        "id": 3,
        "UserId": 4,
        "ProductId": 3,
        "Quantity": 5,
        "createdAt": "2020-04-22T06:30:01.301Z",
        "updatedAt": "2020-04-22T06:30:01.301Z"
    }
]


Error Response:

Code: 400 Bad Request
Content: { message : "Error Message" }
OR



Notes:

______________________________________________________________________________________
Title

Add Cart

URL

"/cart"

Method:

POST

URL Params
id:Integer


Required:
-access_token:string


Optional:


Data Params

Body : 
-ProductId: Integer
-Quantity: Integer
-UserId: Integer

Success Response:


Code: 200 OK
Content: 
{
    "id": 3,
    "UserId": 4,
    "ProductId": 3,
    "Quantity": 5,
    "updatedAt": "2020-04-22T06:30:01.301Z",
    "createdAt": "2020-04-22T06:30:01.301Z"
}


Error Response:

Code: 400 Bad Request
Content: { message : "Error Message" }
OR



Notes:

______________________________________________________________________________________
Title

Update Cart

URL

"/cart/:id"

Method:

PUT

URL Params
id:Integer


Required:
-access_token:string


Optional:


Data Params

Body : 
-ProductId: Integer
-Quantity: Integer
-UserId: Integer

Success Response:


Code: 201 Created
Content: 
{
    "msg": "Successfully Update Cart"
}


Error Response:

Code: 400 Bad Request
Content: { message : "Error Message" }
OR



Notes:

______________________________________________________________________________________
Title

Delete Cart

URL

"/cart/:id"

Method:

DELETE

URL Params
id:Integer


Required:
-access_token:string


Optional:


Data Params

Body : 

Success Response:


Code: 201 Created
Content: 
{
    "msg": "Successfully Delete Cart"
}


Error Response:

Code: 400 Bad Request
Content: { message : "Error Message" }
OR



Notes:

______________________________________________________________________________________
Title

Checkout

URL

"/cart/checkout"

Method:

PATCH

URL Params
id:Integer


Required:
-access_token:string


Optional:


Data Params

Body : 

Success Response:


Code: 201 Created
Content: 
[
    {
        "id": 2,
        "UserId": 4,
        "ProductId": 3,
        "Quantity": 55,
        "TotalPrice": 1650000,
        "updatedAt": "2020-04-22T06:37:13.248Z",
        "createdAt": "2020-04-22T06:37:13.248Z"
    }
]


Error Response:

Code: 400 Bad Request
Content: { message : "Error Message" }
OR



Notes:

______________________________________________________________________________________
Title

Get Order(Order History)

URL

"/cart/order"

Method:

get

URL Params
id:Integer


Required:
-access_token:string


Optional:


Data Params

Body : 

Success Response:


Code: 200 Ok
Content: 
[
    {
        "id": 1,
        "UserId": 4,
        "ProductId": 3,
        "Quantity": 5,
        "TotalPrice": 150000,
        "createdAt": "2020-04-22T03:54:52.137Z",
        "updatedAt": "2020-04-22T03:54:52.137Z",
        "Product": {
            "id": 3,
            "Name": "Produk-1",
            "Image_Url": "https://media.giphy.com/media/4D0BFNg8NIfvi/giphy.gif",
            "Price": 30000,
            "Stock": 195,
            "createdAt": "2020-04-15T12:45:59.388Z",
            "updatedAt": "2020-04-22T03:54:52.055Z"
        },
        "User": {
            "id": 4,
            "Email": "testing123@mail.com",
            "Password": "$2a$04$gV9MO2/g62MoOorstbOoae8fCPXM5dp4alhW6yD7YnHUUKa4b.6U6",
            "Role": "User",
            "createdAt": "2020-04-21T16:40:58.651Z",
            "updatedAt": "2020-04-21T16:40:58.651Z"
        }
    }
]


Error Response:

Code: 400 Bad Request
Content: { message : "Error Message" }
OR



Notes:

______________________________________________________________________________________
Title

Get Cart Detail

URL

"/cart/:id"

Method:

GET

URL Params
id:Integer


Required:
-access_token:string


Optional:


Data Params

Body : 

Success Response:


Code: 200 Ok
Content: 
    {
        "id": 1,
        "UserId": 4,
        "ProductId": 3,
        "Quantity": 5,
        "TotalPrice": 150000,
        "createdAt": "2020-04-22T03:54:52.137Z",
        "updatedAt": "2020-04-22T03:54:52.137Z",
        "Product": {
            "id": 3,
            "Name": "Produk-1",
            "Image_Url": "https://media.giphy.com/media/4D0BFNg8NIfvi/giphy.gif",
            "Price": 30000,
            "Stock": 195,
            "createdAt": "2020-04-15T12:45:59.388Z",
            "updatedAt": "2020-04-22T03:54:52.055Z"
        },
        "User": {
            "id": 4,
            "Email": "testing123@mail.com",
            "Password": "$2a$04$gV9MO2/g62MoOorstbOoae8fCPXM5dp4alhW6yD7YnHUUKa4b.6U6",
            "Role": "User",
            "createdAt": "2020-04-21T16:40:58.651Z",
            "updatedAt": "2020-04-21T16:40:58.651Z"
        }
    }


Error Response:

Code: 400 Bad Request
Content: { message : "Error Message" }
OR



Notes:

______________________________________________________________________________________