# Brada-commercez
#### API DOCUMENTATION

###### Adhiawa Alif Archiafinno - Brada-commerce

**USER**
-----
**Login**
----
  Login user

* **URL**

  /users/login

* **Method:**

  `POST`
  
*  **URL Params**
    None

* **Data Params**
`{ "email" : "admin@gmail.com", "password" : "12341234" }`
  **Required**
  - `email` : string
  - `password` : string


* **Success Response:**

  * **Code:** 200 
    **Content:**
    `{
        "id": 3,
        "email": "user2@mail.com",
        "role": "admin",
        "token": "dsfhksdafljkashfjkshfihadsjk.sdfhasjfhdsjkfhjladshflaf.sjhfjashfjskahfkjdashfkjlas"
    }`
    

* **Error Responses:**

  * **Code:**400 VALIDATION ERROR<br />
    **Content:**<br>
    `{
        "errors": [
            {
                "message": "Invalid email/password"
            }
        ]
    }`


  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:**<br>
    `{
        "errors": [
            {
                "message": "Internal server error"
            }
        ]
    }`


**Show Products**
----
  show all todos.

* **URL**

  /todos

* **Method:**

  `GET`

* **Headers :**
  token=[STRING]
  
*  **URL Params**

   **Required:**
 
   `NONE`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "Products": [
        {
            "id": 43,
            "productName": "salgador",
            "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/61B87NUOHFL._AC_UL1168_.jpg",
            "price": "200000",
            "stock": "12",
            "category": "brogue",
            "createdAt": "2020-04-04T01:27:03.061Z",
            "updatedAt": "2020-04-04T01:27:03.061Z"
        },
        {
            "id": 44,
            "productName": "belikeun",
            "imageUrl": "https://image.rakuten.co.jp/noel-ange/cabinet/shoes/timberland2/timberland-12909-a.jpg",
            "price": "210000",
            "stock": "11",
            "category": "sneakers",
            "createdAt": "2020-04-04T01:27:03.061Z",
            "updatedAt": "2020-04-04T01:27:03.061Z"
        },
    ]
}`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

  OR

  * **Code:** 401 NOT FOUND <br />
    **Content:** `{
        name: `Unauthenticated`,
        errors: [{ message: `User unauthenticated` }]
  }`



**Create a product**
----
  Create a new product.

* **URL**

  /products

* **Method:**

  `POST`

  * **Headers :**
  token=[STRING]
  
*  **URL Params**

   **Required:**
 
   `NONE`

*  **Required Body**
   **Content:** {
    productName: 'terminator',
    imageUrl: 'https://cdn.elevenia.co.id/g/8/0/5/4/3/7/18805437_B_V1.jpg',
    price: 150000,
    stock: 10,
    category: 'sneakers'
}

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
    "Product": {
        productName: 'terminator',
        imageUrl: 'https://cdn.elevenia.co.id/g/8/0/5/4/3/7/18805437_B_V1.jpg',
        price: 150000,
        stock: 10,
        category: 'sneakers'
    }
}`
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `[{
            message: 'product name is required'
        },
        {
            message: 'stock is required'
        },
        {
            message: 'price is required'
        },
        {
            message: 'category is required'
        }
    ]`

    OR

    **Content:** [{
        message: 'Price must be greater than or equal to 0'
    }]

    OR

    **Content:** [{
        message: 'Stock must be greater than or equal to 0'
    }]

    OR

  * **Code:** 401 JsonWebToken Error <br />
    **Content:** `[{
        message: `Please Login`
    }]`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
        name: `InternalServerError`,
        errors: [{ message: `Internal Server Error`]
  }`




**Update a product**
----
  Update a product.

* **URL**

  /products/:id

* **Method:**

  `PUT`

* **Headers :**

  token=[STRING]
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

*  **Required Body**
   **Content:** {
    productName: 'terminator',
    imageUrl: 'https://cdn.elevenia.co.id/g/8/0/5/4/3/7/18805437_B_V1.jpg',
    price: 150000,
    stock: 10,
    category: 'sneakers'
}

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** [{
        message: 'Successfully edited one product'
    }]
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
        name: `NotFound`,
        errors: [{ message: `there is no product with this name`]
  }`

  OR

  * **Code:** 401 NOT FOUND <br />
    **Content:** `{
        name: `Unauthenticated`,
        errors: [{ message: `User unauthenticated` }]
    }`

    OR

    **Content:** `{
        name: `JsonWebTokenError`,
        errors: [{ message: `Please Login` }]
    }`

    * **Code:** 403 Unauthorized <br />
    **Content:** `{
        name: `Unauthorized`,
        errors: [{ message: `User unauthorized` }]
    }`

    OR

    * **Code:** 400 VALIDATION ERROR <br />
        **Content:** `{
            name: `SequelizeValidationError`,
            errors: [{ message: `Error on Validation`]
    }`
  
    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
            name: `InternalServerError`,
            errors: [{ message: `Internal Server Error`]
    }`




 **DELETE Product**     
----
  Delete a product.

* **URL**

  /products/:id

* **Method:**

  `DELETE`

* **Headers :**
  token=[STRING]
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "message": "Successfully deleted one product"
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
        name: `NotFound`,
        errors: [{ message: `there is no product with this name`]
  }`

  OR

  * **Code:** 401 NOT FOUND <br />
    **Content:** `{
        name: `Unauthenticated`,
        errors: [{ message: `User unauthenticated` }]
    }`

    OR

    **Content:** `{
        name: `JsonWebTokenError`,
        errors: [{ message: `Please Login` }]
    }`

    * **Code:** 403 Unauthorized <br />
    **Content:** `{
        name: `Unauthorized`,
        errors: [{ message: `User unauthorized` }]
    }`
    
    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
            name: `InternalServerError`,
            errors: [{ message: `Internal Server Error`]
    }`



