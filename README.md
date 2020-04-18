## **Login Admin**

* **URL:**

​			/user/login

* **Method:**

​		`POST`

- **URL Params**

  **Required:**

  `None`

- **Data Headers**

  **Required:**

  `None`

- **Success Response:**

  - **Code:** 200 
    **Content:** 

    ```json
    {
      "id": 7,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNTg2ODc4MjAwfQ.-g5qVzqb2ofEBiFg6xlvmC2XEfXiFaJ2ahyjolqcjaM"
    }
    ```
    

- **Error Response:**

  - **Code:** 401 Unauthorized
    **Content:** 

    ```json
    {
      "msg": "username/password not found"
    }
    ```
    
    
  
- **Sample Call:**

  ```
     axios({
        method:"POST",
        url:"https://g-kanban.herokuapp.com/user/login",
        data:{
            username:this.username,
            password:this.password
        }
    })
  ```



## **ADD PRODUCT**

* **URL:**

​			/product

* **Method:**

​		`POST`

- **URL Params**

  **Required:**

  `None`

- **Data Headers**

  **Required:**

  `token=[string]`

- **Success Response:**

  - **Code:** 200 
    **Content:** 

    ```json
    {
    	"name": "Coki Coki",
    	"image_url": "dsadfdsfds",
    	"price": 5000,
    	"stock": 20
    }
    ```
    
    
  
  
  
- **Sample Call:**

  ```
  axios({
      method:"POST",
      url:"/product",
      data:{
  	"name": "Coki Coki",
  	"image_url": "dsadfdsfds",
  	"price": 5000,
  	"stock": 20
  	},
      headers:{
      	token:localStorage.token
      }
  })
  ```



## **Find All Product**

* **URL:**

​			/product

* **Method:**

​		`GET`

- **URL Params**

  **Required:**

  `None`

- **Data Headers**

  **Required:**

   ` token : [string]
  
- **Success Response:**

  - **Code:** 200 
    **Content:** 

    ```json
    {
      "data": [
        {
          "id": 1,
          "name": "silverqueen asik",
          "image_url": "dimana",
          "price": 5000,
          "stock": 50,
          "createdAt": "2020-04-18T12:07:10.795Z",
          "updatedAt": "2020-04-18T12:07:51.665Z"
        },
        {
          "id": 2,
          "name": "Coki Coki",
          "image_url": "dsadfdsfds",
          "price": 5000,
          "stock": 20,
          "createdAt": "2020-04-18T13:26:40.562Z",
          "updatedAt": "2020-04-18T13:26:40.562Z"
        }
      ]
    }
    ```
    
    
  
  
  
  
  
- **Sample Call:**

  ```
  axios({
      method:"GET",
      url:"/product",
      headers:{
      	token:localStorage.token
      }
  })
  ```





## **Edit Product**

* **URL:**

​			/product/:id

* **Method:**

​		`PUT`

- **URL Params**

  **Required:**

  `status:[string]`

  `id:[integer]`

- **Data Headers**

  **Required:**

   ` token:[string]`

- **Success Response:**

  - **Code:** 200 
    **Content:** 

    ```json
    {
      "msg": "Update Success"
    }
    ```
    
    
  
- **Error Response:**

  - **Code:** 500
    **Content:** 

    ```json
    {
      "name": "JsonWebTokenError",
      "message": "invalid token"
    }
    ```

    

- **Sample Call:**

  ```
  axios({
      method:"PUT",
      url:"/product/:id,
      data:{	name: '',
              image_url: '',
              price: 0,
              stock: 0
          }
      headers:{
          token:localStorage.token
      }
  })
  
  ```



## **Delete  Task**

* **URL:**

​			product/+id,

* **Method:**

​		`DELETE`

- **URL Params**

  **Required:**

  `id:[integer]`

- **Data Headers**

  **Required:**

   ` token:[string] `

- **Success Response:**

  - **Code:** 200 
    **Content:** 

    ```json
    {
      "message": "Delete Success"
    }
    ```
    

- **Error Response:**

  - **Code:**500
    **Content:** 

    ```json
    {
      "name": "JsonWebTokenError",
      "message": "invalid token"
    }
    ```

    

- **Sample Call:**

  ```
  axios({
      method:"DELETE",
      url:"product/"+id,
      headers:{
          token:localStorage.token
      }
  })
  ```



