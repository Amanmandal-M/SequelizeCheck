// -------------->>>> Model Location<<<<--------------
const { OrderModel } = require("../models/OrderModel")


const OrderDetails = async (req, res) => {
    try {
        const userID = req.body.UserId;
        const OrderData = await OrderModel.findAll({where : {userID: userID } })
        res.status(200).json(OrderData);
    } catch (error) {
        res.status(400).send({
            Message : error.message
        })
    }
}


const CreateOrder = async (req, res) => {
    try {
        const { ItemName, Quantity, TotalPrice } = req.body;
        const userId = req.body.UserId;

        const OrderData = await OrderModel.create({ItemName, Quantity, TotalPrice, userID : userId})

        res.status(200).send({
            "Response": "Orders Created Successfully"
        })
    } catch (error) {
        res.status(400).send({
            Message : error.message
        })
    }
}


const DeleteOrder = async (req, res) => {
    try {
        const {id} = req.params;
        const userID = req.body.UserId;

        const orderData = await OrderModel.findOne({where : { id , userID: userID } })

        if(!orderData){
            res.status(404).send("Deletion Not Allowed!")
        }else{
            await OrderModel.destroy({where: { id , userID: userID }})
            res.status(200).send({
                "Message": "Deletion Successfully"
            })
        }
    } catch (error) {
        res.status(400).send({
            Message : error.message
        })
    }
}


const UpdateOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const { ItemName, Quantity, TotalPrice } = req.body;
      const userID = req.body.UserId;
  
      const orderData = await OrderModel.findOne({
        where: { id, userID }
      });
  
      if (!orderData) {
        return res.status(404).send("Update Not Allowed!");
      } else {
        await OrderModel.update(
          { ItemName, Quantity, TotalPrice },
          { where: { id, userID } }
        );
  
        res.status(200).send({
          Message: "Update Successfully"
        });
      }
    } catch (error) {
      res.status(400).send({
        Message: error.message
      });
    }
};
  



module.exports = { OrderDetails , CreateOrder , UpdateOrder ,  DeleteOrder }