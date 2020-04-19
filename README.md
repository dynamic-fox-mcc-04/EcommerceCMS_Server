# EcommerceCMS_Server

A portfolio project for Hacktiv8 Full-Stack Developer program. Check their website here https://hacktiv8.com/. Pretty self explanatory on what this program does. It's a mock online shop application. Ah, yes, if you wanna have me build one for your homemade bakery or wine or whatever, please tell me.

## PRODUCT ROUTES

## Create Product

Store new Product item to the database. Returns json data about that Product item. Only super admin can do this.

**Url:**

/product

**Method:**

POST

**Request Header:**
{
"token": [string] 
}

**Request Body:**

{

 	"name": [string],

​	"image_url":[string],

​	"category": [string],

​	"price": [integer],

​	"stock": [integer]

}

**Response:**
{

​	"id": [integer],

 	"name": [string],

​	"image_url":[string],

​	"category": [string],

​	"price": [integer],

​	"stock": [integer]

}

## Read Products

Read all existing products.

**URL:**
/product

**Method:**
GET

**Request Header:**
{
"token": [string] 
}

**Request Body:**
None

**Response:**
[
	{
	"id": [integer],
	"name": [string],
	"image_url":[string],
	"category": [string],
	"price": [integer],
	"stock": [integer]
},
	{
	"id": [integer],
	"name": [string],
	"image_url":[string],
	"category": [string],
	"price": [integer],
	"stock": [integer]
},
	//etc 
]

## Update Product

Modify an existing product item on the database.

**URL**:
/product/:id

**Method:**
PUT

**Request Header:**
{
"token": [string] 
}

**Request Body:**
{
	"name": [string],
	"image_url":[string],
	"category": [string],
	"price": [integer],
	"stock": [integer]
}

**Response:**
{
	"id": [integer],
	"name": [string],
	"image_url":[string],
	"category": [string],
	"price": [integer],
	"stock": [integer]
}

## Delete Product

Delete an existing product item on the database.

**URL:**
/product/:id

**Method:**
DELETE

**Request** **Header:**
{
"token": [string]
}

**Request** **Body:**
None

**Response**:
{
	"message": "Item destroyed"
}

## USER ROUTES

## Register

Create a new user. There are three roles, the super admin, standard admin, and "buyer" aka your customers' user account. 

**URL:**
/register

**Method:**
POST

**Request** **Header:**
{
"token": [string]
}

**Request** **Body:**
{
	"email": [string],
	"password": [string],
	"role": [string]
}

**Response**:
{
	"id": [integer],
	"email": [string],
	"role": [string],
	"token": [string]
}

## Login

Log in an existing user.

**URL:**
/login

**Method:**
POST

**Request** **Header:**
{
"token": [string]
}

**Request** **Body:**
{
	"email": [string],
	"password": [string],
}

**Response**:
{
	"email": [string],
	"token": [string]
}

