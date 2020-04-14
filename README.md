# EcommerceCMS_Server

**Base URL**

http://localhost:3000

# Admin

***Signup***
----
  Returns new Admin.

* **URL**

  /signup

* **Method:**

  `POST`
  
*  **URL Params**

    None

* **Data Params**

  * **Required:**
  ````
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }
  ````

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
      "name": "tester",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. eyJpZCI6MSwibmFtZSI6InRlc3RlciIsImVtYWlsIjoidGVzdEBtYWlsLmNvbSIsImlhdCI6MTU4NjM1MzYzMn0.so_v7WBwYcQu8Xlxlz-2jwm3CDd-Bv9oG-IlRgAOHdQ"
    }
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ error : "SequelizeValidationError" }`

  OR

  * **Code:** 500 <br />

* **Sample Call:**

  ```javascript
    
  ```

----
----
***Signin***
----
  Returns Admin.

* **URL**

  /signin

* **Method:**

  `POST`
  
*  **URL Params**

    None

* **Data Params**

  * **Required:**
  ````
    {
      email: req.body.email,
      password: req.body.password,
    }
  ````

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
      "name": "tester",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. eyJpZCI6MSwibmFtZSI6InRlc3RlciIsImVtYWlsIjoidGVzdEBtYWlsLmNvbSIsImlhdCI6MTU4NjM1MzYzMn0.so_v7WBwYcQu8Xlxlz-2jwm3CDd-Bv9oG-IlRgAOHdQ"
    }
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** {
    "message": "Invalid email or password",
    "errors": [
        "Invalid email or password"
      ]
    }

  OR

  * **Code:** 500 <br />

* **Sample Call:**

  ```javascript
    
  ```

----

# Product

***Create***
----
  Returns new Product.

* **URL**

  /product

* **Method:**

  `POST`
  
*  **URL Params**

    None

* **Data Params**

   **Required:**
  ````
    {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      image_Url: req.body.image_Url,
      category: req.body.category
    }
  ````

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
      "product": {
        "id": 1,
        "name": "test",
        "price": 1,
        "stock": 1,
        "image_Url": "https://www.archute.com/wp-content/themes/fox/images/placeholder.jpg",
        "category": "test,
        "updatedAt": "2020-04-14T11:33:35.168Z",
        "createdAt": "2020-04-14T11:33:35.168Z"
      }
    }

 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ error : "SequelizeValidationError" }`

  OR

  * **Code:** 500 <br />

* **Sample Call:**

  ```javascript
    
  ```

----
***Display***
----
  Returns all product.

* **URL**

  /product

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
      {
        "id": 1,
        "name": "test",
        "price": 1,
        "image_Url": "https://www.archute.com/wp-content/themes/fox/images/placeholder.jpg",
        "stock": 1,
        "category": "test,
        "createdAt": "2020-04-14T11:33:35.168Z",
        "updatedAt": "2020-04-14T11:33:35.168Z"
      }
    ]
 
* **Error Response:**

  * **Code:** 500 <br />


* **Sample Call:**

  ```javascript

  ```

----
***findOne***
----
  Returns product by Id.

* **URL**

  /product/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**

   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

* **Code:** 200 <br />
    **Content:** 
    ```
    {
    "id": 1,
    "name": "test",
    "price": 1,
    "image_Url": "https://www.archute.com/wp-content/themes/fox/images/placeholder.jpg",
    "stock": 1,
    "category": "test,
    "createdAt": "2020-04-14T11:33:35.168Z",
    "updatedAt": "2020-04-14T11:33:35.168Z"
    }

    
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{
    "message": "Item not found",
    "errors": [
        "NotFound"
      ]
    }`

* **Sample Call:**

  ```javascript
    
  ```

----
***Update***
---
----
  Returns Updated product.

* **URL**

  /product/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**

   `id=[integer]`

* **Data Params**

  * **Required:**
  ````
    {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      image_Url: req.body.image_Url,
      category: req.body.category,
    }
  ````

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "product": {
        "id": 1,
        "name": "test",
        "price": 2,
        "stock": 1,
        "image_Url": "https://www.archute.com/wp-content/themes/fox/images/placeholder.jpg",
        "category": "test,
        "updatedAt": "2020-04-14T11:33:35.168Z",
        "createdAt": "2020-04-14T11:33:35.168Z"
      }
    }

* **Error Response:**

  * **Code:** 500 <br />

  OR

  * **Code:** 404 <br />
    **Content:** `{
    "message": "Item not found",
    "errors": [
        "NotFound"
      ]
    }`

  OR

  * **Code:** 400  <br />
    **Content:** `{ error : "SequelizeVlaidationError" }`

* **Sample Call:**

  ```javascript
    
  ```

----
***Delete***
----
  Returns deleted product.

* **URL**

  /product/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

  * **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
  **Content:** 
    ```
    {
      "message": "Delete success",
      "deletedProduct": {
          "id": 1,
          "name": "test",
          "price": 1,
          "image_Url": "https://www.archute.com/wp-content/themes/fox/images/ placeholder.jpg",
          "stock": 1,
          "category": "test,
          "createdAt": "2020-04-14T11:33:35.168Z",
          "updatedAt": "2020-04-14T11:33:35.168Z"
      }
    }
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
     **Content:** `{
    "message": "Item not found",
    "errors": [
        "NotFound"
      ]
    }`

  OR

  * **Code:** 500  <br />

  OR

  * **Code:** 401  <br />
    **Content:** `{ error : "Not authenticated" }`



* **Sample Call:**

  ```javascript

  ```
---