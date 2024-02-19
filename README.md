ExpressJS-test

- This is a project that allows you to manage products and users.

# Endpoints

# Products
GET /api/products
This endpoint returns a list of all products in the database.

POST /api/products
This endpoint allows you to create a new product. It expects a JSON object with the following properties:
- title (string): The title of the product.
- description (string): The description of the product.

GET /api/products/:id
This endpoint returns the details of a specific product, identified by its id.

PATCH /api/products/:id
This endpoint allows you to update the details of a specific product, identified by its id. It expects a JSON object with the following properties:
- title (string): The new title of the product.
- description (string): The new description of the product.

DELETE /api/products/:id
This endpoint allows you to delete a specific product, identified by its id.

# Users
GET /api/users
This endpoint returns a list of all users in the database.

POST /api/users
This endpoint allows you to create a new user. It expects a JSON object with the following properties:
- name (string): The name of the user.
- email (string): The email address of the user.
- password (string): The password of the user.

GET /api/users/:id
This endpoint returns the details of a specific user, identified by its id.

PUT /api/users/:id
This endpoint allows you to update the details of a specific user, identified by its id. It expects a JSON object with the following properties:
- name (string): The new name of the user.
- email (string): The new email address of the user.
- password (string): The password of the user.

PATCH /api/users/:id
This endpoint allows you to update the details of a specific user, identified by its id. It expects a JSON object with the following properties:
- name (string): The new name of the user.
- email (string): The new email address of the user.
- password (string): The new password of the user.

DELETE /api/users/:id
This endpoint allows you to delete a specific user, identified by its id.