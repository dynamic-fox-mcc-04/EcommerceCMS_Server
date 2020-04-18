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
