const {Sequelize,DataTypes} =  require ("sequelize")
const { SeqConnection } = require("../configs/db");
const { UserModel } = require("./UserModel");


const OrderModel = SeqConnection.define(
    "Orders",
    {
        ItemName : {
            type : DataTypes.STRING,
            allowNull:false
        },
        Quantity : {
            type : DataTypes.INTEGER,
            allowNull:false,
        },
        TotalPrice : {
            type : DataTypes.INTEGER,
            allowNull:false,
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'UserModel',
              key: 'id'
            }
          }
    }
)

OrderModel.belongsTo(UserModel);

module.exports = { OrderModel }