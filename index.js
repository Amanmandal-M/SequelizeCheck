const express = require('express');
require('dotenv').config();

// Config Location
const { SeqConnection } = require('./configs/db');

// Routes Location
const { UserRouter } = require('./routers/UserRouters');
const { OrderRouter } = require('./routers/OrderRouters');

// Middleware Location
const { Authentication } = require('./middlewares/AuthenticationMiddleware');

const app = express();

app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('<h1 style="text-align:center;color:blue;">Welcome to the Order Food App Backend</h1>');
});

// User routes
app.use('/auth', UserRouter);

// Authentication middleware
app.use(Authentication);

// Order routes
app.use('/orders', OrderRouter);



const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await SeqConnection.authenticate();
    console.log(`Server is listening on PORT: ${PORT}`);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
});
