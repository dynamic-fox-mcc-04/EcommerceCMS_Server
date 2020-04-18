# EcommerceCMS_Server

**Membuat product (Create product)**
----
  Returns json data about a single product that recently added.

* **URL**

  /products

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

```javascript
 {
     "name": "Guava", ​"image_url": "https://firebasestorage.googleapis.com/v0/b/storagetest-6ef69.appspot.com/o/baju.jpg-2020-04-18T07%3A11%3A37.772Z?alt=media&token=2f9ce9f6-9ce5-444d-817f-5d56c2b1d8a2", "price": "200000", "stock": "20", "category": "Apparel"
 }
 ```

* **Success Response:**

  * **Code:** 201 Created <br />
    **Content:** `{ "id": "2" "name": "Guava", ​"image_url": "https://firebasestorage.googleapis.com/v0/b/storagetest-6ef69.appspot.com/o/baju.jpg-2020-04-18T07%3A11%3A37.772Z?alt=media&token=2f9ce9f6-9ce5-444d-817f-5d56c2b1d8a2", "price": "200000", "stock": "20", "category": "Apparel" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors : [{ message: 'Name is required field' }, {      message: 'Price is required field' }, { message: 'Stock is required field' } ] }`

    OR

    **Content:** `{ errors : [{ message: 'Price must be greater than 0' }] }`

    OR

    **Content:** `{ errors : [{ message: 'this field must be url like' }] }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ errors : [{ message: "Product Not Found"}] }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ errors : [{message: "Internal Server Error."}] }`

 **Request Header:**
 ```javascript
 {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJoYXJpc2tpMThAZ21haWwuY29tIiwiaWF0IjoxNTg1NjY3MzgzfQ.t2IFTfKLMEGi_LHVKdR_qaqczqN8tRKBg66z-sVtR5E"
 }
 ```
 -----------------------------------------------------------------------------------

**Mengambil semua data product (Read product)**
----
  Returns json data about multiple product that already exists in database.

* **URL**

  /products?category=

  OR

  /products

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{  [ { "id": 2, "title": "DB Programming with SQL", "category": "On-Going", "createdAt": "2020-04-08T13:55:40.209Z", "updatedAt": "2020-04-08T14:16:12.856Z", "userId": 1 } ] }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ errors : [{ message: "Internal Server Error."}] }`

 **Request Header:**
 ```javascript
 {  
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJoYXJpc2tpMThAZ21haWwuY29tIiwiaWF0IjoxNTg1NjY3MzgzfQ.t2IFTfKLMEGi_LHVKdR_qaqczqN8tRKBg66z-sVtR5E"
 }
 ```
 -----------------------------------------------------------------------------------

 **Mengubah data product (Update product)**
----
  Returns message of data update.

* **URL**

  /products/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**
 
    `id=[integer]`

* **Data Params**

```javascript
 {
    "name": "Guava", ​"image_url": "https://firebasestorage.googleapis.com/v0/b/storagetest-6ef69.appspot.com/o/baju.jpg-2020-04-18T07%3A11%3A37.772Z?alt=media&token=2f9ce9f6-9ce5-444d-817f-5d56c2b1d8a2", "price": "200000", "stock": "20", "category": "Apparel"
 }
 ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "message": "Data successfully updated" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ errors : [{ message: "Error Not Found."}]}`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors : [{ message: "Invalid request." }] }`

        OR
     **Content:** `{ errors : [{ message: 'Name is required field' }, {      message: 'Price is required field' }, { message: 'Stock is required field' } ] }`

        OR

    **Content:** `{ errors : [{ message: 'Price must be greater than 0' }] }`

        OR

    **Content:** `{ errors : [{ message: 'this field must be url like' }] }`


    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ errors : [{ message: "Internal Server Error." }] }`

 **Request Header:**
 ```javascript
 {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJoYXJpc2tpMThAZ21haWwuY29tIiwiaWF0IjoxNTg1NjY3MzgzfQ.t2IFTfKLMEGi_LHVKdR_qaqczqN8tRKBg66z-sVtR5E"
 }
 ```


 -----------------------------------------------------------------------------------

  **Menghapus data product (Delete product)**
----
  Returns json data about a single product that recently deleted.

* **URL**

  /tasks/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
    `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message: "Task successfully deleted." }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ errors : [{ message: "Error Not Found."}] }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ errors : [{ message: "Internal Server Error." }] }`

 **Request Header:**
 ```javascript
 {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJoYXJpc2tpMThAZ21haWwuY29tIiwiaWF0IjoxNTg1NjY3MzgzfQ.t2IFTfKLMEGi_LHVKdR_qaqczqN8tRKBg66z-sVtR5E"
 }
 ```
 -----------------------------------------------------------------------------------

 **Membuat user (Create user)**
----
  Returns json data about a single user that recently added.

* **URL**

  /users/register

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

```javascript
 {
     "email": "sample@mail.com",
     "password": "EF797C8118F02DFB649607DD5D3F8C7623048C9C063D532CC95C5ED7A898A64F",
     "role": "admin"
 }
 ```

* **Success Response:**

  * **Code:** 201 Created <br />
    **Content:** `{ "id": 1, "email": "sample@email.com", "role": "admin" }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ errors : "Internal Server Error." }`

 -----------------------------------------------------------------------------------

  **Signin user**
----
  Returns json data about a single user that recently signed in.

* **URL**

  /users/login

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

```javascript
 {
     "email": "sample@mail.com",
     "password": "12345678"
 }
 ```

* **Success Response:**

  * **Code:** 200 Ok <br />
    **Content:** `{ "id": 1, "email": "sample@email.com", "role": "admin" "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJoYXJpc2tpMThAZ21haWwuY29tIiwiaWF0IjoxNTg1NjY3MzgzfQ.t2IFTfKLMEGi_LHVKdR_qaqczqN8tRKBg66z-sVtR5E" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors : [{ message: "Invalid request."}] }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ errors : [{ message: "Internal Server Error." }] }`

 -----------------------------------------------------------------------------------