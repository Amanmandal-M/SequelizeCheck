const express = require('express');
const { OrderDetails , CreateOrder , DeleteOrder } = require('../controllers/OrderController')

const OrderRouter = express.Router();

OrderRouter.get("/" , OrderDetails);

OrderRouter.post("/create" , CreateOrder);

OrderRouter.delete("/delete/:id" , DeleteOrder);


module.exports = { OrderRouter };