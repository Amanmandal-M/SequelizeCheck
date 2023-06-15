const express = require('express');
const { OrderDetails, CreateOrder, DeleteOrder, SingleOrderDetails , UpdateOrder} = require('../controllers/OrderController');

const OrderRouter = express.Router();

// Route to get all order details
OrderRouter.get("/", OrderDetails);

// Route to get a single order details by ID
OrderRouter.get("/:id", SingleOrderDetails);

// Route to create a new order
OrderRouter.post("/create", CreateOrder);

// Route to update an existing order
OrderRouter.patch("/update/:id", UpdateOrder);

// Route to delete an existing order
OrderRouter.delete("/delete/:id", DeleteOrder);

module.exports = { OrderRouter };
