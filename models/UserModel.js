const {DataTypes} =  require ("sequelize")
const { SeqConnection } = require("../configs/db");

const UserModel = SeqConnection.define(
    "Users",
    {
        Name : {
            type : DataTypes.STRING,
            allowNull:false
        },
        Email : {
            type : DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        Password : {
            type : DataTypes.STRING,
            allowNull:false,
            unique:true
        }  
    }
)

module.exports = { UserModel }