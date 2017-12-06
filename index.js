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
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
const globalVar = require('./global')

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

app.post('/register', async function(req, res) {
  var parse = req.body
  var respond = await user.register(parse.Username, parse.Password, parse.Type, parse.PhoneNumber, parse.Name)
  res.json(respond)
})

app.post('/getUserInfo', async function(req, res) {
  var parse = req.body
  var respond = await user.getUserInfo(parse.username)
  res.json(respond)
})

app.post('/login', async function(req, res) {
  var parse = req.body
  var respond = await user.login(parse.Username, parse.Password)
  res.json(respond)
})

app.post('/banuser', async function(req, res) {
  var parse = req.body
  var respond = await user.banUser(parse.Username)
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

app.post('/addFood', async function(req, res) {
  console.log('start Add Food')
  var parse = req.body
  var respond = await foodHandle.addFood(parse.name, parse.image, parse.price, parse.type)
  res.sendStatus(200)
  console.log('DOne Add Food')
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

app.post('/changeOrderStatus', async function(req, res) {
  var parse = req.body
  var respond = await order.changeOrderStatus(parse.orderID, parse.newStatus)
  res.json(respond)
})

app.post('/getHistoryOrder', async function(req, res) {
  var parse = req.body
  var respond = await order.getHistoryOrder(parse.state)
  res.json(respond)
})

app.get('/getCurrentOrderAdmin', async function(req, res) {
  var respond = await order.getCurrentOrderAdmin()
  res.json(respond)
})

app.get('/getHistoryOrderAdmin', async function(req, res) {
  var respond = await order.getHistoryOrderAdmin()
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

app.post('/editUser', async function(req, res) {
  var parse = req.body
  var respond = await user.editUser(parse.username, parse.name, parse.phoneNumber, parse.password, parse.type)
  res.send(respond)
})
app.post('/deleteFood', async function(req, res) {
  var parse = req.body
  var respond = await foodHandle.deleteFood(parse.foodID)
  res.send(respond)
})

app.post('/upload', upload.single('pic'), function (req, res, next) {
  console.log('upload')
  var path = req.file.path
  var filename = req.body.name
  var type = req.body.type
  const bucketName = 'seniorproject-server.appspot.com';
  var myBucket = globalVar.storage.bucket(bucketName)
  foodHandle.uploadFile(bucketName, path, filename, type, callback => {
    console.log(callback)
    res.send(callback)
  })
})
