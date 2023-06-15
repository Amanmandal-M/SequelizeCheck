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
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
          }
    }
)

OrderModel.belongsTo(UserModel);

module.exports = { OrderModel }