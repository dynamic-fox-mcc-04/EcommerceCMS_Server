# EcommerceCMS_Server

## **Register (Customer)**

Creates new user and returns a token and the name of the user

- **URL**

  /register

- **Method:**

  `POST`

- **URL Params**

  **Required:**

  `none`

- **Data Params**

  `username=[string], email=[string], password=[string]`

- **Success Response:**

  - Code:

    201

    Content:

    ```
    { 
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE1ODcxNzg0Nzl9.xEgZ-jz_H-v4evbdU892DUfgQsP3HS8assArcJQIxUQ", 
      "currentUser": "test" 
    }
    ```

- **Error Response:**

  - **Code:** 400
    **Content:** `{ message : "Email already Exists" }`

  OR

  - **Code:** 500

- **Sample Call:**

  none

## **Login (Customer)**

Finds a user that matches the inputted email then (if the email matched) compares password and (if the password matched) returns a token and the name of the user.

- **URL**

  /login

- **Method:**

  `POST`

- **URL Params**

  **Required:**

  `email=[string], password=[string]`

- **Data Params**

  None

- **Success Response:**

  - Code:

     

    200

    Content:

    ```
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE1ODcxNzg0Nzl9.xEgZ-jz_H-v4evbdU892DUfgQsP3HS8assArcJQIxUQ",
      "currentUser": "test" 
    }`
    ```

- **Error Response:**

  - **Code:** 400
    **Content:** `{ message : "Invalid email/password" }`

  OR

  - **Code:** 500

- **Sample Call:**

  none

## **Login (Admin)**

Finds a user that matches the inputted email then (if the email matched) compares password then (if the password matched) checks the role of the user, if the role is admin, it returns a token.

- **URL**

  /login/admin

- **Method:**

  `POST`

- **URL Params**

  **Required:**

  `email=[string], password=[string]`

- **Data Params**

  None

- **Success Response:**

  - Code:

    200

    Content:

    ```
    { 
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE1ODcxNzg0Nzl9.xEgZ-jz_H-v4evbdU892DUfgQsP3HS8assArcJQIxUQ" 
    }
    ```

- **Error Response:**

  - **Code:** 400
    **Content:** `{ message : "Admin only! No trespassing!" }`

  OR

  - **Code:** 400
    **Content:** `{ message : "Invalid email/password" }`

  OR

  - **Code:** 500

- **Sample Call:**

  none

  ## **GET all Customers (user without admin)**

Finds all user that regist as customers returns username, email, and date when they're joined.

- **URL**

  /

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  None

- **Data Params**

  None

- **Success Response:**

  - Code:  

    200

    Content:

    ```
    [
      {
          "id": 6,
          "username": "test3",
          "email": "test3@mail.com",
          "password": "$2b$10$8jFDn1ERGyvVMSKqns6vCuNCbZ1PE72wlI.PVHMEsqxu/oE0z3SZG",
          "role": "customer",
          "createdAt": "2020-04-18T05:31:20.312Z",
          "updatedAt": "2020-04-18T05:31:20.312Z"
      },
      {
          "id": 5,
          "username": "test2",
          "email": "test2@mail.com",
          "password": "$2b$10$P5I8rRgcCDnjZF85fz40I.I9AzZjuvVIfEvoIYePK.8mUdh5vuaLK",
          "role": "customer",
          "createdAt": "2020-04-18T05:31:12.130Z",
          "updatedAt": "2020-04-18T05:31:12.130Z"
      },
      {
          "id": 4,
          "username": "test1",
          "email": "test@mail.com",
          "password": "$2b$10$SFAVCRO0LhH2DBx1YSomNu8N1V6MpPIEGtU03I8kFDbTWQ0sgzpyG",
          "role": "customer",
          "createdAt": "2020-04-18T05:30:56.423Z",
          "updatedAt": "2020-04-18T05:30:56.423Z"
      }
    ]
    ```

- **Error Response:**

  - **Code:** 400
    **Content:** `{ message : "User Not Found" }`

  OR

  - **Code:** 500

- **Sample Call:**

  none

# Product

## **Add Product**

Adds new product and returns the added product.

- **URL**

  /products

- **Method:**

  `POST`

- **URL Params**

  **Required:**

  `none`

- **Data Params**

  `name=[string], price=[integer], stock=[integer], image_url=[string]`

- **Success Response:**

  - Code:

    201

    Content:

    ```
    { 
      "id": 1,
      "name": "OLYMPUS OM-D E-M1 Mark II kit 12-40mm f/2.8 PRO (Black)",
      "image_url": "https://ecommercehacktiv8.s3-ap-southeast-1.amazonaws.com/rsz_col24171-olympus-om-d-e-m1-mark-ii-kit-12-40mm-f28-pro-_black__d1.png",
      "price": 37299000,
      "stock": 5,
      "category": "Olympus", 
      "updatedAt": "2020-04-12T17:53:31.366Z", 
      "createdAt": "2020-04-12T17:53:31.366Z" 
    }
    ```

- **Error Response:**

  - **Code:** 500

- **Sample Call:**

  none

## **Fetch Products**

Returns an array of object json data about all products.

- **URL**

  /products

- **Method:**

  `GET`

- **Headers**

  **Required: Access Token**

  `token=[string]`

- **URL Params**

  **Required:**

  `none`

- **Data Params**

  None

- **Success Response:**

  - Code:

     

    200

    Content:

    ```
    [
      { 
      	"id": 1,
        "name": "OLYMPUS OM-D E-M1 Mark II kit 12-40mm f/2.8 PRO (Black)",
        "image_url": "https://ecommercehacktiv8.s3-ap-southeast-1.amazonaws.com/rsz_col24171-olympus-om-d-e-m1-mark-ii-kit-12-40mm-f28-pro-_black__d1.png",
        "price": 37299000,
        "stock": 5,
        "category": "Olympus", 
        "updatedAt": "2020-04-12T17:53:31.366Z", 
        "createdAt": "2020-04-12T17:53:31.366Z" 
      }, 
      { 
      	"id": 2,
        "name": "Nikon D850 Kit AF-S VR 24-120mm f/4G",
        "image_url": "https://ecommercehacktiv8.s3-ap-southeast-1.amazonaws.com/CNK24169-Nikon-D850-Kit-AF-S-VR-24-120mm-f4G_D1-rev.png",
        "price": 49999000,
        "stock": 10,
        "category": "Nikon" 
        "updatedAt": "2020-04-12T17:53:31.366Z", 
        "createdAt": "2020-04-12T17:53:31.366Z" 
      } 
    ]
    ```

- **Error Response:**

  - **Code:** 500

- **Sample Call:**

  none

## **Delete Product**

Deletes a product and returns json data about the deleted product.

- **URL**

  /products

- **Method:**

  `DELETE`

- **Headers**

  **Required: Access Token**

  `token=[string]`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Data Params**

  None

- **Success Response:**

  - Code:

     

    200

    Content:

    ```
    { 
    	"id": 2,
        "name": "Nikon D850 Kit AF-S VR 24-120mm f/4G",
        "image_url": "https://ecommercehacktiv8.s3-ap-southeast-1.amazonaws.com/CNK24169-Nikon-D850-Kit-AF-S-VR-24-120mm-f4G_D1-rev.png",
        "price": 49999000,
        "stock": 10,
        "category": "Nikon" 
        "updatedAt": "2020-04-12T17:53:31.366Z", 
        "createdAt": "2020-04-12T17:53:31.366Z" 
      } 
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND
    **Content:** `{ message : "Product not found" }`

  OR

  - **Code:** 500

- **Sample Call:**

  none

## **Get Product by ID**

Returns json data about a single product.

- **URL**

  /products

- **Method:**

  `GET`

- **Headers**

  **Required: Access Token**

  `token=[string]`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Data Params**

  None

- **Success Response:**

  - Code:

     

    200

    Content:

    ```
    { 
    	"id": 2,
        "name": "Nikon D850 Kit AF-S VR 24-120mm f/4G",
        "image_url": "https://ecommercehacktiv8.s3-ap-southeast-1.amazonaws.com/CNK24169-Nikon-D850-Kit-AF-S-VR-24-120mm-f4G_D1-rev.png",
        "price": 49999000,
        "stock": 10,
        "category": "Nikon" 
        "updatedAt": "2020-04-12T17:53:31.366Z", 
        "createdAt": "2020-04-12T17:53:31.366Z" 
    } 
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND
    **Content:** `{ message : "Product not found" }`

  OR

  - **Code:** 500

- **Sample Call:**

  none

## **Update Product**

Update a product and returns json data about the updated product.

- **URL**

  /products

- **Method:**

  `PUT`

- **Headers**

  **Required: Access Token**

  `token=[string]`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Data Params**

  None

- **Success Response:**

  - Code:

    200

    Content:

    ```
    { 
      "id": 1,
      "name": "OLYMPUS OM-D E-M1 Mark II kit 12-40mm f/2.8 PRO (Black)",
      "image_url": "https://ecommercehacktiv8.s3-ap-southeast-1.amazonaws.com/rsz_col24171-olympus-om-d-e-m1-mark-ii-kit-12-40mm-f28-pro-_black__d1.png",
      "price": 37299000,
      "stock": 5,
      "category": "Olympus", 
      "updatedAt": "2020-04-12T17:53:31.366Z", 
      "createdAt": "2020-04-12T17:53:31.366Z" 
    }
    ```

- **Error Response:**

  - **Code:** 500

- **Sample Call:**

  none

# Cart

## **Add Cart**

Finds a cart, if it does not exist, it adds new cart and returns the added cart.

- **URL**

  /carts

- **Method:**

  `POST`

- **Headers**

  **Required: Access Token**

  `token=[string]`

- **URL Params**

  **Required:**

  `none`

- **Data Params**

  `ProductId=[integer]`

- **Success Response:**

  - Code:

     

    201

    Content:

    ```
    {
      "id": 2,
      "product_qty": 1,
      "paid": false,
      "UserId": 4,
      "ProductId": 10,
      "updatedAt": "2020-04-14T11:20:34.331Z",
      "createdAt": "2020-04-14T11:20:34.331Z"
    }
    ```

- **Error Response:**

  - **Code:** 400
    **Content:** `{ message : "Product existed, try updating instead of adding a new one" }`

  OR

  - **Code:** 500

- **Sample Call:**

  none

## **Fetch Cart**

Returns an array of object json data about all carts owned by current logged in user.

- **URL**

  /carts

- **Method:**

  `GET`

- **Headers**

  **Required: Access Token**

  `token=[string]`

- **URL Params**

  **Required:**

  `none`

- **Data Params**

  None

- **Success Response:**

  - Code:

     

    200

    Content:

    ```
    [
      {
        "id": 2,
        "product_qty": 1,
        "paid": false,
        "UserId": 3,
        "ProductId": 1,
        "createdAt": "2020-03-25T16:23:17.471Z",
        "updatedAt": "2020-03-25T16:23:17.471Z",
        "Product": {
           "id": 1,
           "name": "OLYMPUS OM-D E-M1 Mark II kit 12-40mm f/2.8 PRO (Black)",
           "image_url": "https://ecommercehacktiv8.s3-ap-southeast-1.amazonaws.com/rsz_col24171-olympus-om-d-e-m1-mark-ii-kit-12-40mm-f28-pro-_black__d1.png",
           "price": 37299000,
           "stock": 5,
           "category": "Olympus", 
           "updatedAt": "2020-04-12T17:53:31.366Z", 
           "createdAt": "2020-04-12T17:53:31.366Z" 
    	 }
      },
      {
        "id": 2,
        "product_qty": 1,
        "paid": false,
        "UserId": 3,
        "ProductId": 2,
        "createdAt": "2020-03-25T15:46:58.165Z",
        "updatedAt": "2020-03-25T15:46:58.165Z",
        "Product": { 
            "id": 2,
            "name": "Nikon D850 Kit AF-S VR 24-120mm f/4G",
            "image_url": "https://ecommercehacktiv8.s3-ap-southeast-1.amazonaws.com/CNK24169-Nikon-D850-Kit-AF-S-VR-24-120mm-f4G_D1-rev.png",
            "price": 49999000,
            "stock": 10,
            "category": "Nikon" 
            "updatedAt": "2020-04-12T17:53:31.366Z", 
            "createdAt": "2020-04-12T17:53:31.366Z" 
        } 
      }
    ]
    ```

- **Error Response:**

  - **Code:** 500

- **Sample Call:**

  none

## **Increase Product Quantity on A Cart**

Updates the product_qty of a cart (increased by 1) and returns the updated cart.

- **URL**

  /carts

- **Method:**

  `PATCH`

- **Headers**

  **Required: Access Token**

  `token=[string]`

- **URL Params**

  **Required:**

  `cartId=[integer]`

- **Data Params**

  None

- **Success Response:**

  - Code:

     

    200

    Content:

    ```
    {
      "id": 4,
      "product_qty": 2,
      "paid": false,
      "UserId": 3,
      "ProductId": 2,
      "createdAt": "2020-04-14T06:14:22.012Z",
      "updatedAt": "2020-04-14T06:16:08.556Z"
    }
    ```

- **Error Response:**

  - **Code:** 500

- **Sample Call:**

  none

## **Decrease Product Quantity on A Cart**

Updates the product_qty of a cart (decreased by 1) and returns the updated cart.

- **URL**

  /carts

- **Method:**

  `PATCH`

- **Headers**

  **Required: Access Token**

  `token=[string]`

- **URL Params**

  **Required:**

  `cartId=[integer]`

- **Data Params**

  None

- **Success Response:**

  - Code:

     

    200

    Content:

    ```
    {
      "id": 4,
      "product_qty": 1,
      "paid": false,
      "UserId": 3,
      "ProductId": 2,
      "createdAt": "2020-04-14T06:14:22.012Z",
      "updatedAt": "2020-04-14T06:16:08.556Z"
    }
    ```

- **Error Response:**

  - **Code:** 500

- **Sample Call:**

  none

## **Delete Cart**

Deletes a cart and returns json data about the deleted cart.

- **URL**

  /carts

- **Method:**

  `DELETE`

- **Headers**

  **Required: Access Token**

  `token=[string]`

- **URL Params**

  **Required:**

  `cartId=[integer]`

- **Data Params**

  None

- **Success Response:**

  - Code:

     

    200

    Content:

    ```
    {
      "id": 4,
      "product_qty": 1,
      "paid": false,
      "UserId": 3,
      "ProductId": 2,
      "createdAt": "2020-04-14T06:14:22.012Z",
      "updatedAt": "2020-04-14T06:16:08.556Z"
    }
    ```

- **Error Response:**

  - **Code:** 500

- **Sample Call:**

  none

## **Add Cart (alternative)**

Finds a cart, if it does not exist, it adds new cart (with the quantity inputted manually) and returns the added cart.

- **URL**

  /carts

- **Method:**

  `POST`

- **URL Params**

  **Required:**

  `none`

- **Data Params**

  `ProductId=[integer], product_qty=[integer]`

- **Success Response:**

  - Code:

     

    201

    Content:

    ```
    {
      "id": 6,
      "product_qty": 6,
      "paid": false,
      "UserId": 3,
      "ProductId": 3,
      "updatedAt": "2020-04-14T11:20:34.331Z",
      "createdAt": "2020-04-14T11:20:34.331Z"
    }
    ```

- **Error Response:**

  - **Code:** 400
    **Content:** `{ message : "Product existed, try updating instead of adding a new one" }`

  OR

  - **Code:** 500

- **Sample Call:**

  none