**REST API DOCUMENTATION**
----
* **BaseURL**
https://polar-dusk-05144.herokuapp.com

**Return List of Product**

* **URL**

  _/product

* **Method:**

  `GET`

* **Success Response:**
  

  * **Code:** 200 <br />
   ```javascript
   {
    "id": "",
    "name": "",
    "image_url": "",
    "price": "",
    "stock": "",
    "createdAt": "",
    "updatedAt": "",
    "AdminId:""
   }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{...}` <br /> <br />

* **Sample Call:**
```javascript
'https://polar-dusk-05144.herokuapp.com/product'
```



**Return List of Product By Id**

* **URL**

  _/product/:id_

* **Method:**

  `GET`
  
*  **URL Params**

   <_If URL params exist, specify them in accordance with name mentioned in URL section. Separate into optional and required. Document data constraints._> 

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
```javascript
   {
    "id": "",
    "name": "",
    "image_url": "",
    "price": "",
    "stock": "",
    "createdAt": "",
    "updatedAt": "",
    "AdminId:"",
   }
```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{...}` <br /> <br />

  * **Sample Call:**
```javascript
'https://polar-dusk-05144.herokuapp.com/product/:id'
```


**Create Product**

* **URL**

  _/product

* **Method:**

  `POST`

* **Data Params**
```javascript
    name=[String],
    price=[Integer],
    image_url=[String],
    stock=[Integer],
    AdminId=[Integer]
```

* **Success Response:**

  * **Code:** 201 <br />
```javascript
   {
     "id": "",
    "name": "",
    "image_url": "",
    "price": "",
    "stock": "",
    "createdAt": "",
    "updatedAt": "",
    "AdminId:"",
   }
```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "SequelizeValidationError" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{...}` <br /> <br />

* **Sample Call:**
```javascript
'https://polar-dusk-05144.herokuapp.com/product'
```



**Delete Product**

* **URL**

  _/product/:id_

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`


* **Success Response:**

  * **Code:** 200 <br />
```javascript
   {

   }
```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{...}` <br /> <br />

* **Sample Call:**
```javascript
'https://polar-dusk-05144.herokuapp.com/product/:id'
```



**Update Product**

* **URL**

  _/product/:id_

* **Method:**

  `PATCH`
  
*  **URL Params**

   <_If URL params exist, specify them in accordance with name mentioned in URL section. Separate into optional and required. Document data constraints._> 

   **Required:**
 
   `id=[integer]`

* **Data Params**
```javascript
    name=[String],
    image_url=[String],
    price=[Integer],
    stock=[Integer]
```

* **Success Response:**

  * **Code:** 200 <br />
```javascript
   {
    "name": "",
    "image_url": "",
    "price": "",
    "stock": ""
   }
```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "SequelizeValidationError" }`


  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{...}` <br /> <br />

* **Sample Call:**
```javascript
'https://polar-dusk-05144.herokuapp.com/product/:id'
```


**Sign In Admin**

* **URL**

  _/admin/signin

* **Method:**

  `POST`
  

* **Data Params**
```javascript
    email=[String],
    password=[String]
```

* **Success Response:**

  * **Code:** 200 <br />
```javascript
   {
    "id": "",
    "email": "",
    "access_token": ""
   }
```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid email or password" }`


  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{...}` <br /> <br />

* **Sample Call:**
```javascript
'https://polar-dusk-05144.herokuapp.com/admin/signin'
```

**Sign In User**

* **URL**

  _/signin

* **Method:**

  `POST`
  

* **Data Params**
```javascript
    email=[String],
    password=[String]
```

* **Success Response:**

  * **Code:** 200 <br />
```javascript
   {
    "id": "",
    "email": "",
    "access_token": ""
   }
```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid email or password" }`


  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{...}` <br /> <br />

* **Sample Call:**
```javascript
'https://polar-dusk-05144.herokuapp.com/signin'
```

**Sign Up User**

* **URL**

  _/signup

* **Method:**

  `POST`
  

* **Data Params**
```javascript
    email=[String],
    password=[String]
```

* **Success Response:**

  * **Code:** 200 <br />
```javascript
   {
    "id": "",
    "email": "",
    "access_token": ""
   }
```
 
* **Error Response:**


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{...}` <br /> <br />

* **Sample Call:**
```javascript
'https://polar-dusk-05144.herokuapp.com/signup'
```

**Return List of Cart**

* **URL**

  _/cart

* **Method:**

  `GET`

* **Success Response:**
  

  * **Code:** 200 <br />
   ```javascript
   {
    "name": "",
    "image_url": "",
    "quantity": "",
    "isPaid": "",
    "UserId": "",
    "ProductId": "",
    "createdAt": "",
    "updatedAt": ""
   }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{...}` <br /> <br />

* **Sample Call:**
```javascript
'https://polar-dusk-05144.herokuapp.com/cart'
```


**Create Cart**

* **URL**

  _/cart

* **Method:**

  `POST`

* **Data Params**
```javascript
    name=[String],
    image_url=[String],
    quantity=[Integer],
    UserId=[Integer],
    ProductId=[Integer],
    price=[Integer]
```

* **Success Response:**

  * **Code:** 201 <br />
```javascript
   {
    "name": "",
    "image_url": "",
    "quantity": "",
    "isPaid": "",
    "UserId": "",
    "ProductId": "",
    "createdAt": "",
    "updatedAt": ""
   }
```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "SequelizeValidationError" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{...}` <br /> <br />

* **Sample Call:**
```javascript
'https://polar-dusk-05144.herokuapp.com/cart'
```
