const express = require('express')
require('dotenv').config();
const router = require('./router.js')
const pool = require('../database/db.js')
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 3000
app.use(morgan('dev'))
app.use(express.json())
app.use('/', router)
app.get('/loaderio-12f7a3c1f129dc82f35cb36acf434d3d.html', (req, res) => {
  res.send('loaderio-12f7a3c1f129dc82f35cb36acf434d3d')
})


app.listen(port, function () {
  console.log(`listening on port ${port}`);
});