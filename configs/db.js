const Sequelize = require('sequelize');
require('dotenv').config();

const SeqConnection = new Sequelize( 
        process.env.DB_NAME,  //Database Name
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect:"mysql",
        }
)

SeqConnection.authenticate()
.then(()=>{
    console.log("Connected to MySQL")
})
.catch((error)=>{
    console.log(`Error in MySQL : ${error}`)
})


module.exports = { SeqConnection }