const { OrderModel } = require("../models/OrderModel");

// Get all orders for a specific user
const OrderDetails = async (req, res) => {
  try {
    const userID = req.body.UserId;
    const OrderData = await OrderModel.findAll({ where: { UserId: userID } });
    res.status(200).json(OrderData);
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

// Get details of a single order for a specific user
const SingleOrderDetails = async (req, res) => {
  const { id } = req.params;
  const userID = req.body.UserId;

  try {
    const OrderData = await OrderModel.findOne({ where: { id , UserId: userID } });
    if (OrderData) {
      res.status(200).json(OrderData);
    } else {
      res.status(404).json({ Message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

// Create a new order
const CreateOrder = async (req, res) => {
  try {
    const { ItemName, Quantity, TotalPrice } = req.body;
    const userID = req.body.UserId;

    await OrderModel.create({
      ItemName,
      Quantity,
      TotalPrice,
      userID
    });

    res.status(201).json({ Message: "Order created successfully" });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

// Update an existing order
const UpdateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { ItemName, Quantity, TotalPrice } = req.body;
    const userID = req.body.UserId;

    const orderData = await OrderModel.findOne({
      where: { id, UserId: userID },
    });

    if (!orderData) {
      return res.status(404).json({ Message: "Order not found" });
    }

    await OrderModel.update(
      { ItemName, Quantity, TotalPrice },
      { where: { id, UserId: userID } }
    );

    res.status(204).json({ Message: "Order updated successfully" });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

// Delete an order
const DeleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userID = req.body.UserId;

    const orderData = await OrderModel.findOne({
      where: { id, UserId: userID },
    });

    if (!orderData) {
      res.status(404).json({ Message: "Order not found" });
    } else {
      await OrderModel.destroy({ where: { id, UserId: userID } });
      res.status(202).json({ Message: "Order deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

module.exports = {
  OrderDetails,
  SingleOrderDetails,
  CreateOrder,
  UpdateOrder,
  DeleteOrder,
};