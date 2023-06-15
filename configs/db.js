const Sequelize = require('sequelize');
require('dotenv').config();

const SeqConnection = new Sequelize( 
        process.env.MYSQLDATABASE,  //Database Name
        process.env.MYSQLUSER,
        process.env.MYSQLPASSWORD,
        {
            host: process.env.MYSQLHOST,
            port: process.env.MYSQLPORT,
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