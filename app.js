const express = require('express');

require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`server in ${process.env.NODE_ENV} mode running at port ${PORT}`)
);
