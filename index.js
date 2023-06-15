const express = require('express');
const CookeiParser = require('cookie-parser'); 
require('dotenv').config();

// -------------->>>> Config Location<<<<--------------
const { SeqConnection } = require('./configs/db');


// -------------->>>> Routes Location<<<<--------------
const { UserRouter } = require('./routers/UserRouters');
const { OrderRouter } = require('./routers/OrderRouters');


// -------------->>>> Middleware Location<<<<--------------
const { Authentication } = require('./middlewares/AuthenticationMiddleware');

const app = express();

app.use(express.json());
app.use(CookeiParser());

app.get('/', (req,res)=>{
    res.send(`<h1 style="text-align:center;color:blue;">Welcome in MySQL Backend</h1>`)
})

app.use("/auth",UserRouter);
app.use(Authentication);
app.use("/orders",OrderRouter);




app.listen(process.env.PORT , async () => {
    try {
        SeqConnection;
        console.log(`Server Listening on PORT: ${process.env.PORT}`);
    } catch (error) {
        res.status(400).send(
            {
                Message:"Not Working Main Code",
                Error: error.message        
            }
        )
    }
});