# Order Food App Backend

## About

<br>

This is an Order Food Backend application that utilizes a MySQL database. The backend supports CRUD (Create, Read, Update, Delete) operations, allowing users to register, login, order food, and add food items.

<br>

## Clone a Repository

```
https://github.com/Amanmandal-M/SequelizeCheck.git
```

## Installation

```
npm install
npm install -g nodemon
```

<strong>Note : </strong> Don't need to install packages if you only use this command all the packages automatically install if you want to add more packages then you have to write this command `npm install <your package name>`.

## Start the Backend server

```
node index.js

nodemon index.js
```

<strong>Note : </strong> You can use any of them .

<br>

## MVC Structure

```
├── index.js
├── configs
|    └── db.js
├── models
|    └── UserModel.js
|    └── OrderModel.js
├── routes
|    └── userRouters.js
|    └── OrderRouters.js
├──middlewares
|    └── AuthenticationMiddleware.js
├──controllers
|    └── UserController.js
|    └── OrderController.js
```

<strong>Note : </strong>

- Before doing anything first create `.env` file and put these things :
  - `PORT` : your server is listen in this port
  - `MYSQLDATABASE` : your MySQL database name
  - `MYSQLUSER` : your MySQL username
  - `MYSQLPASSWORD` : your MySQL password
  - `MYSQLHOST` : your MySQL hostname
  - `MYSQLPORT` : your MySQL port
  - `NORMALKEY` : your secret key

<br>

## Schema Design

<br>

<h3><strong>User Table</strong><h3>

```js
{
    id: {
        // `default value` you don't have to write this
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    }
}
```

<h3><strong>Orders Table</strong><h3>

```js
{
    id: {
        // `default value` you don't have to write this
    },
    ItemName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    TotalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserModel.Users, // Provide the table name associated with the UserModel
            key: "id",
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
}
```

## Endpoints

<table>
    <thead>
        <tr>
            <th>METHOD</th>
            <th>ENDPOINT</th>
            <th>DESCRIPTION</th>
            <th>STATUS CODE</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>POST</td>
            <td>/auth/register</td>
            <td>This endpoint should allow users to register. Hash the password on store.</td>
            <td>201</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/auth/login</td>
            <td>This endpoint should allow users to login. Return JWT token on successful login</td>
            <td>201</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/orders/</td>
            <td>This endpoint should return a list of all orders of current users.</td>
            <td>200</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/orders/:id</td>
            <td>This endpoint should return a single product of that current customer</td>
            <td>200</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/orders/create</td>
            <td>This endpoint should allow users to create a new order</td>
            <td>201</td>
        </tr>
        <tr>
            <td>PATCH</td>
            <td>/orders/:id</td>
            <td>This endpoint should allow the user to update order details</td>
            <td>204</td>
        </tr>
        <tr>
            <td>DELETE</td>
            <td>/orders/posts/:id</td>
            <td>This endpoint should allow users to delete a specific order identified by order id.</td>
            <td>202</td>
        </tr>
    </tbody>
</table>

<br>

## Backend Deployed Link : 

<h2>
<strong>
<a href="https://sequelizecheck.up.railway.app/" target="_blank">Railway</a>
</strong>
</h2>

<br>

## MySQL is Depoloyed on Railway it is totally handled by Railway