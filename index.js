var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
var http = require("http");
var https = require("https");
const user = require('./controller/user')
const foodHandle = require('./controller/foodHandle')
const checkOut = require('./controller/checkOut')
const order = require('./controller/order')

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('hello world')
})

app.post('/register', function(req, res) {
  var parse = req.body
  user.register(parse.Username, parse.Password, parse.Type, parse.PhoneNumber, parse.Name)
  res.sendStatus(200)
})

app.post('/login', async function(req, res) {
  var parse = req.body
  var respond = await user.login(parse.Username, parse.Password)
  res.json(respond)
})

app.get('/getfood', async function(req, res) {
  var respond = await foodHandle.getAllFood()
  res.send(respond)
})

app.get('/getdrink', async function(req, res) {
  var respond = await foodHandle.getAllDrink()
  res.send(respond)
})

app.post('/checkout', async function(req, res) {
  var parse = req.body
  var respond = await checkOut.checkout(parse.MyState, parse.Order, parse.specialOrder)
  res.send(respond)
})

app.post('/getCurrentOrder', async function(req, res) {
  var parse = req.body
  var respond = await order.getCurrentOrder(parse.state)
  res.json(respond)
})

app.post('/getHistoryOrder', async function(req, res) {
  var parse = req.body
  var respond = await order.getHistoryOrder(parse.state)
  res.json(respond)
})

app.post('/cancleFood', async function(req, res) {
  var parse = req.body
  var respond = await order.cancleFood(parse.orderID)
  res.send(respond)
})

app.get('/allStudent', async function(req, res) {
  var respond = await user.getAllStudent()
  res.send(respond)
})

app.get('/allStaff', async function(req, res) {
  var respond = await user.getAllStaff()
  res.send(respond)
})
