const express = require('express');

require('dotenv').config(); //load config variable

const company = require('./routes/company.js'); //import company routes

const connectDB = require('./utils/db.js'); //import database

const app = express();

app.use(express.json()); //body parser

connectDB(); //connect to database

app.use('/api/company', company);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`server in ${process.env.NODE_ENV} mode running at port ${PORT}`)
);
