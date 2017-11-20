const globalVar = require('../global')

module.exports.getCurrentOrder = async function (state) {
  var data;
  const kind = 'Order';
  const taskKey = globalVar.datastore.key([kind]);
  const query = globalVar.datastore.createQuery([kind])
  .filter('UserID', '=', state)
   await globalVar.datastore.runQuery(query)
  .then((results) => {
    var tasks = results[0];
    data = results[0]
  });
 return deleteC(data)
}

function deleteC(data) {
  var newData = []
  for (i = 0; i < data.length; i++) {
    if (data[i].FoodStatus !== 'Delivered'){
      newData.push(data[i])
    }
}
  return newData
}

module.exports.getHistoryOrder = async function (state) {
  var data;
  const kind = 'Order';
  const taskKey = globalVar.datastore.key([kind]);
  const query = globalVar.datastore.createQuery([kind])
  .filter('UserID', '=', state)
  .filter('FoodStatus', '=', 'Delivered')
   await globalVar.datastore.runQuery(query)
  .then((results) => {
    var tasks = results[0];
    data = results[0]
  });
  console.log(data[0])
 return data
}

module.exports.testUpdate = async function () {
  // var data;
  const kind = 'Order';
  const id = 5642779036221440
  const taskKey = globalVar.datastore.key([kind,id]);
 const task = {
   FoodStatus: 'Delivered'
 }
 const entity = {
      key: taskKey,
      data: task
    };
  console.log('DONE QUERY')
  // console.log(data[0])
  await globalVar.datastore.update(entity)
  .then((results) => {
    console.log(results[0], "Result from delete")
  });
  console.log('Done Delete')
  return "Hi"
}

module.exports.cancleFood = async function (OrderID) {
  try{
  var data;
  const kind = 'Order';
  const taskKey = globalVar.datastore.key([kind]);
  console.log("B4 QUERY")
  console.log(OrderID.orderID, 'ORDERID')
  const query = globalVar.datastore.createQuery([kind])
  .filter('OrderID', '=', OrderID.orderID)
  await globalVar.datastore.runQuery(query)
 .then((results) => {
   var tasks = results[0];
   data = results[0]
 });
 console.log(data)
  const id = parseInt(data[0][globalVar.datastore.KEY].id)
  console.log(id, "ID")
  const cancleTaskKey = globalVar.datastore.key([kind,id]);
  await globalVar.datastore.delete(cancleTaskKey)
  .then(() => {
    console.log('Done Delete')
      });
  return 'done'
}
catch (e) {
  console.log(e)
}
}
