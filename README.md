# EcommerceCMS_Server

* **BASE URL**

  LOCAL - localhost:3000/
  HEROKU - https://ecommerce-server-robin.herokuapp.com

**Show All Product**
----
  Returns json data about all products.

* **URL**

  /products/

* **Method:**

  `GET`
  
*  **Headers Params**
  
   **Required:**

  `access_token=[token]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `
            "id": 1,
            "name": "Masker",
            "image_url": "https://media.suara.com/pictures/653x366/2020/02/29/45914-ilustrasi-masker.jpg",
            "price": 5000,
            "stock": 10,
            "createdAt": "2020-04-17T13:07:02.013Z",
            "updatedAt": "2020-04-17T13:07:02.013Z",
            "UserId": 1,
            "User": {
                "id": 1,
                "email": "admin@mail.com",
                "password": "$2a$10$WFCjunAr7j2ZfZXqh0GlGuFfNiHXuzfOm2jtp9g8plPcJWkQ95VSW",
                "role": "admin",
                "createdAt": "2020-04-17T13:07:01.852Z",
                "updatedAt": "2020-04-17T13:07:01.852Z"
            }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `err`

* **Sample Call:**

  ```javascript
    axios({
        method: 'GET',
        url: context.state.baseUrl + '/products',
        headers: {
          access_token: localStorage.token
        }
      })
  ```

**Show Product Detail**
----
  Returns json data about a single Product.

* **URL**

  /products/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`
  
*  **Headers Params**
  
   **Required:**

  `access_token=[token]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `
        "result": {
        "id": 1,
        "name": "Masker",
        "image_url": "https://media.suara.com/pictures/653x366/2020/02/29/45914-ilustrasi-masker.jpg",
        "price": 5000,
        "stock": 10,
        "createdAt": "2020-04-17T13:07:02.013Z",
        "updatedAt": "2020-04-17T13:07:02.013Z",
        "UserId": 1
    },
    "message": "Found"
    `
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "Product Not Found" }`

* **Sample Call:**

  ```javascript
    axios({
        method: 'GET',
        url: context.state.baseUrl + '/products/' + payload.id,
        headers: {
          access_token: localStorage.token
        }
      })
  ```


**Create Product**
----
  Create json data about a single Product.

* **URL**

  /products

* **Method:**

  `POST`
  
*  **Headers Params**
  
   **Required:**

  `access_token=[token]`

* **Data Params**

   **Required:**

  `req.body`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `
    {
    "result": {
        "id": 9,
        "name": "bum",
        "image_url": "aaa",
        "price": 1000,
        "stock": 1,
        "UserId": 1,
        "updatedAt": "2020-04-17T13:22:00.815Z",
        "createdAt": "2020-04-17T13:22:00.815Z"
    },
    "message": "Successfully created new product"
    }
    `
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Input cannot be empty " }`

* **Sample Call:**

  ```javascript
    axios({
        method: 'POST',
        url: context.state.baseUrl + '/products',
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock
        },
        headers: {
          access_token: localStorage.token
        }
    })
  ```


**Update Product**
----
  Update json data about a single product.

* **URL**

  /products/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  `req.body`
  
*  **Headers Params**
  
   **Required:**

  `access_token=[token]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{
    "result": [
        1,
        [
            {
                "id": 3,
                "name": "maskerrr",
                "image_url": "https://cf.shopee.co.id/file/f747ca26ccb029ed5770f415a4f1a52b",
                "price": 5000,
                "stock": 100,
                "createdAt": "2020-04-17T13:07:02.013Z",
                "updatedAt": "2020-04-17T13:41:50.513Z",
                "UserId": 1
            }
        ]
    ],
    "message": "Successfully updated product"
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "Product not found" }`

OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Input cannot be empty " }`

* **Sample Call:**

  ```javascript
    axios({
        method: 'PUT',
        url: context.state.baseUrl + '/products/' + payload.id,
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock
        },
        headers: {
          access_token: localStorage.token
        }
      })
  ```


**Delete Product**
----
  Delete json data about a single product.

* **URL**

  /products/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

  
*  **Headers Params**
  
   **Required:**

  `access_token=[token]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "message": "Successfully deleted product" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "Product Not Found" }`

* **Sample Call:**

```javascript
      axios({
        method: 'DELETE',
        url: context.state.baseUrl + '/products/' + payload.id,
        headers: {
          access_token: localStorage.token
        }
      })
  })
  ```

**Login User**
----
  Login registered user.

* **URL**

  /users/login

* **Method:**

  `POST`

* **Auth:**

  `role=[admin]`

* **Data Params**

   **Required:**
 
   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ access_token : xyz }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "User not found" }`

* **Sample Call:**

```javascript
      axios({
        method: 'POST',
        url: context.state.baseUrl + '/users/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
  ```

  **Register User**
----
  Register new user.

* **URL**

  /users/register

* **Method:**

  `POST`
  
* **Data Params**

   **Required:**
 
   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 201 OK <br />
    **Content:** `{
    "id": 3,
    "email": "i@i.com"
}`
 
* **Error Response:**

  * **Code:** 400 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "code": 400,
    "name": "Bad Request",
    "errors": [
        {
            "message": "Email already exists"
        }
    ]
}`

* **Sample Call:**

```javascript
  axios({
        method: 'POST',
        url: context.state.baseUrl + '/users/register',
        data: {
          email: payload.email,
          password: payload.password,
          role: payload.role
        }
      })
```

**Login Customer**
----
  Login registered customer.

* **URL**

  /users/loginUser

* **Method:**

  `POST`

* **Auth:**

  `role=[user]`

* **Data Params**

   **Required:**
 
   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ access_token : xyz }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "User not found" }`

* **Sample Call:**

```javascript
      axios({
        method: 'POST',
        url: context.state.baseUrl + '/users/loginUser',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
  ```

  **Show All User**
----
  Returns json data about all User.

* **URL**

  /users/

* **Method:**

  `GET`
  
*  **Headers Params**
  
   **Required:**

  `access_token=[token]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `
    {
    "result": [
        {
            "id": 1,
            "email": "admin@mail.com",
            "password": "$2a$10$WFCjunAr7j2ZfZXqh0GlGuFfNiHXuzfOm2jtp9g8plPcJWkQ95VSW",
            "role": "admin",
            "createdAt": "2020-04-17T13:07:01.852Z",
            "updatedAt": "2020-04-17T13:07:01.852Z"
        },
            `
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `err`

* **Sample Call:**

  ```javascript
    axios({
        method: 'GET',
        url: context.state.baseUrl + '/users',
        headers: {
          access_token: localStorage.token
        }
      })
  ```

**Show All Order_Product_**
----
  Returns json data about all Order_Product_.

* **URL**

  /order_product_s/

* **Method:**

  `GET`
  
*  **Headers Params**
  
   **Required:**

  `access_token=[token]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `
    {
    "result": [
        {
            "id": 34,
            "quantity": 8,
            "OrderId": 17,
            "ProductId": 4,
            "createdAt": "2020-04-21T10:54:41.610Z",
            "updatedAt": "2020-04-21T10:54:41.610Z",
            "Product": {
                "id": 4,
                "name": "maskerrr",
                "image_url": "https://cdn.pixabay.com/photo/2017/05/07/08/56/pancakes-2291908_960_720.jpg",
                "price": 20000,
                "stock": 8,
                "createdAt": "2020-04-17T13:07:02.013Z",
                "updatedAt": "2020-04-23T03:00:43.307Z",
                "UserId": 2
            },
            "Order": {
                "id": 17,
                "checkout_status": true,
                "total_quantity": 0,
                "total_product": 0,
                "total_price": 0,
                "UserId": 13,
                "createdAt": "2020-04-21T10:54:41.596Z",
                "updatedAt": "2020-04-21T10:54:41.596Z",
                "User": {
                    "id": 13,
                    "email": "user@mail.com",
                    "password": "$2a$10$Uv2ijEqGIt4gMUyTzfDPVeKLqDVHPqs9NqaGrVAI6QL6HoHwovZbi",
                    "role": "user",
                    "createdAt": "2020-04-18T04:30:35.068Z",
                    "updatedAt": "2020-04-18T04:30:35.068Z"
                }
            }
        },
            `
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `err`

* **Sample Call:**

  ```javascript
    axios({
        method: 'GET',
        url: context.state.baseUrl + '/order_product_s',
        headers: {
          access_token: localStorage.token
        }
      })
  ```

**Create Order_Product_ (Add Cart)**
----
  Check whether an Order is already made, update if already made, create if not. And then Create json data about a single Order_Product_ when the product is not yet available, or update when product is already available. And also check if the quantity requested in Order_Product is more than Product Stock.

* **URL**

  /order_product_s/:id

* **Method:**

  `POST`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

   **Required:**
 
   `quantity=[integer]`

*  **Headers Params**
  
   **Required:**

  `access_token=[token]`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `
    {
    "result": [
        1,
        [
            {
                "id": 56,
                "quantity": 99,
                "OrderId": 32,
                "ProductId": 2,
                "createdAt": "2020-04-22T05:47:38.129Z",
                "updatedAt": "2020-04-23T06:19:47.035Z"
            }
        ]
    ],
    "message": "Successfully created / updated product in order_product_ table"
    }
            `
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `err`

* **Sample Call:**

  ```javascript
    axios({
        method: 'POST',
        url: context.state.baseUrl + '/order_product_s/' + payload.id,
        data: {
          quantity: payload.quantity
        },
        headers: {
          access_token: localStorage.token
        }
      })
  ```

**Create Order_Product_ (Update Cart)**
----
   Update json data about Order_Product_. And also check if the quantity requested in Order_Product is more than Product Stock.

* **URL**

  /order_product_s/:id

* **Method:**

  `PUT`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

   **Required:**
 
   `quantity=[integer]`,
   `orderDetails=[object]`


*  **Headers Params**
  
   **Required:**

  `access_token=[token]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `
    {
    "result": [
        1,
        [
            {
                "id": 56,
                "quantity": 99,
                "OrderId": 32,
                "ProductId": 2,
                "createdAt": "2020-04-22T05:47:38.129Z",
                "updatedAt": "2020-04-23T06:19:47.035Z"
            }
        ]
    ],
    "message": "Successfully updated product in order_product_ table"
    }
            `
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `err`

* **Sample Call:**

  ```javascript
    axios({
        method: 'PUT',
        url: context.state.baseUrl + '/order_product_s/' + payload.id,
        data: {
          quantity: payload.quantity,
          OrderId: payload.OrderId
        },
        headers: {
          access_token: localStorage.token
        }
      })
  ```

**Show All Order**
----
  Returns json data about all products.

* **URL**

  /orders/

* **Method:**

  `GET`
  
*  **Headers Params**
  
   **Required:**

  `access_token=[token]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `
    {
    "result": [
        {
            "id": 32,
            "checkout_status": false,
            "total_quantity": 0,
            "total_product": 0,
            "total_price": 0,
            "UserId": 13,
            "createdAt": "2020-04-22T05:47:06.363Z",
            "updatedAt": "2020-04-23T04:58:40.828Z",
            "User": {
                "id": 13,
                "email": "user@mail.com",
                "password": "$2a$10$Uv2ijEqGIt4gMUyTzfDPVeKLqDVHPqs9NqaGrVAI6QL6HoHwovZbi",
                "role": "user",
                "createdAt": "2020-04-18T04:30:35.068Z",
                "updatedAt": "2020-04-18T04:30:35.068Z"
            }
        },
            `
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `err`

* **Sample Call:**

  ```javascript
    axios({
        method: 'GET',
        url: context.state.baseUrl + '/orders',
        headers: {
          access_token: localStorage.token
        }
      })
  ```

**Check Stock**
----
  Returns json data about product stock and availability status and difference.

* **URL**

  /orders/checkStock

* **Method:**

  `PUT`

* **Data Params**

   **Required:**
 
   `orderDetails=[object]`
  
*  **Headers Params**
  
   **Required:**

  `access_token=[token]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `
    "result": {
        "ProductId": 1,
        "name": "magnum",
        "stock": 100,
        "quantity": 10,
        "difference": 90,
        "status": true
    }
  `
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `err`

* **Sample Call:**

  ```javascript
    axios({
        method: 'PUT',
        url: context.state.baseUrl + '/orders/checkStock',
        data: {
          orderDetails: payload.orderDetails
        },
        headers: {
          access_token: localStorage.token
        }
      })
  ```

**Check Out**
----
  Returns message when a product successfully checks out.

* **URL**

  orders/:OrderId/checkOut

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `OrderId=[integer]`


*  **Headers Params**
  
   **Required:**

  `access_token=[token]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** ` message: 'Successfully checked out' `
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `err`

* **Sample Call:**

  ```javascript
    axios({
        method: 'PUT',
        url: context.state.baseUrl + '/orders/' + payload.OrderId + '/checkOut',
        headers: {
          access_token: localStorage.token
        }
      })
  ```

**Update Stock**
----
  Returns json message when product stock is updated, while deleting from order_product_ table if product quantity is 0.

* **URL**

  /orders/updateStock

* **Method:**

  `PUT`

* **Data Params**

   **Required:**
 
   `orderDetails=[object]`
  
*  **Headers Params**
  
   **Required:**

  `access_token=[token]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `message: 'Stock Updated' `
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `err`

* **Sample Call:**

  ```javascript
    axios({
        method: 'PUT',
        url: context.state.baseUrl + '/orders/updateStock',
        data: {
          orderDetails: payload.orderDetails
        },
        headers: {
          access_token: localStorage.token
        }
      })
  ```
