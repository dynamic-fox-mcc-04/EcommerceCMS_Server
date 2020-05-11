**Login User**
----
  Login Admin

* **URL**

  https://balada-ids.herokuapp.com/login

* **Method:**

  `POST`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `access_token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJpbmdnYXJkc0BnbWFpbC5jb20iLC `
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

    * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ type : bad request`
                    `errors : [{ message: Invalid password/email }]`
                   `}`


* **Sample Call:**
    ```javascript
    POST /register HTTP/1.1
    Host: balada-ids.herokuapp.com
    Content-Type: application/json

    {
	"email" : "user@mail.com",
	"password" : "1234"
    }
    ```

**Get Products**
----
  Returns Products data .

* **URL**

    https://balada-ids.herokuapp.com/category

* **Method:**

  `GET`


  * **Request Headers:**
  `{ access_token : YOUR_TOKEN }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**  
    ``` javascript
    "categories": [
        {
            "id": 22,
            "name": "baju 2",
            "image_url":"https://image.shutterstock.com/imag",
            "price":10000,
            "stock":5
            "createdAt": "2020-04-10T09:02:41.865Z",
            "updatedAt": "2020-04-10T09:02:41.865Z",
            "UserId": 6
        }

    ```
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

* **Code:** 400 BAD REQUEST <br />
**Content:** `{ type : bad request`
                `errors : [{ message: "Invalid Token !!" }]`
                `}`
* **Sample Call:**

     ``` javascript 
    GET /category HTTP/1.1
    Host: balada-ids.herokuapp.com/
    access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJqb2tvQGdtYWlsLmNvbSIsImlhdCI6MTU4NjUwOTMzNn
    Content-Type: application/json
    ```


**Create Product**
----
  Create Product data .

* **URL**

    https://balada-ids.herokuapp.com/category

* **Method:**

  `POST`


  * **Request Headers:**
  `{ access_token : YOUR_TOKEN }`

  * **Request Body:**
```javascript
   {
    "name": "baju 2",
    "image_url":"https://image.shutterstock.com/image"
    "price":10000,
    "stock":5
   }
```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**  `"message": { "Success create product"}`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`


* **Sample Call:**
    ``` javascript 
    POST /category HTTP/1.1
    Host: balada-ids.herokuapp.com/
    access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJqb2tvQGdtYWlsLmNvbSIsImlhdCI6MTU4NjUwOTMzNn
    Content-Type: application/json

       {
            "id": 22,
            "name": "baju 2",
            "image_url":"https://image.shutterstock.com/imag",
            "price":10000,
            "stock":5
            "createdAt": "2020-04-10T09:02:41.865Z",
            "updatedAt": "2020-04-10T09:02:41.865Z",
            "UserId": 6
        }


    ```


**Update Product**
----

Update Product data .

* **URL**

    https://balada-ids.herokuapp.com/category/:id

* **Method:**

  `PUT`

*  **URL Params**

   **Required:**
 
   `id=[integer]`


  * **Request Headers:**
  `{ access_token : YOUR_TOKEN }`


  * **Request Body:**
```javascript
   {
    "name": "baju 2",
    "image_url":"https://image.shutterstock.com/imag",
    "price":10000,
    "stock":5
   }
```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**  `"message": { "Success update product"}`


* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`


* **Sample Call:**
    ``` javascript 
    PUT /category/21 HTTP/1.1
    Host: balada-ids.herokuapp.com/
    access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJqb2tvQGdtYWlsLmNvbSIsImlhdCI6MTU4NjUwOTMzNn
    Content-Type: application/json

     {
        "name": "baju 2",
        "image_url":"https://image.shutterstock.com/imag",
        "price":10000,
        "stock":5
    }

    ```

**Delete Product**
----

Delete Product data .

* **URL**

    https://balada-ids.herokuapp.com/category/:id

* **Method:**

  `DELETE`

*  **URL Params**

   **Required:**
 
   `id=[integer]`


  * **Request Headers:**
  `{ access_token : YOUR_TOKEN }`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:**  `"message": { "Success delete balada"}`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`


* **Sample Call:**
    ``` javascript 
    DELETE /category/21 HTTP/1.1
    Host: kanban-ids.herokuapp.com/
    access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJqb2tvQGdtYWlsLmNvbSIsImlhdCI6MTU4NjUwOTMzNn
    Content-Type: application/json

    ```