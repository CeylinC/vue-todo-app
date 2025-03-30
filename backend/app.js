require('dotenv').config();
const cors = require('cors');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const path = require('path');

app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const main = require('./routes/main')
const login = require('./routes/login')

app.use('/', main)
app.use('/login', login)

app.listen(process.env.PORT, process.env.HOSTNAME, () => {
  console.log(`Server Çalışıyor, http://${process.env.HOSTNAME}:${process.env.PORT}/`)
})