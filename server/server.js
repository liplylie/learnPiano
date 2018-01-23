const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
// const router = require('./router/router.js')
const app = express()
let port = process.env.PORT || 3000;
let ip = 'localhost'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'../client/static')))
// app.use('/api', router)
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/static', 'index.html'));
})
app.listen(port, function(){
	console.log("server is listening on port " + port)
})

module.exports = app;