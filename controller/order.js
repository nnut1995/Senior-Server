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

module.exports.getCurrentOrderAdmin = async function () {
  var data;
  const kind = 'Order';
  const taskKey = globalVar.datastore.key([kind]);
  const query = globalVar.datastore.createQuery([kind])
   await globalVar.datastore.runQuery(query)
  .then((results) => {
    var tasks = results[0];
    data = results[0]
  });
 var newData = deleteC(data)
 console.log("Start Loop")
 for (i = 0; i < newData.length; i++) {
   console.log()
     var userData;
     const kind = 'User';
     const taskKey = globalVar.datastore.key([kind]);
     const query = globalVar.datastore.createQuery([kind])
     .filter('Username', '=', newData[i].UserID)
      await globalVar.datastore.runQuery(query)
     .then((results) => {
       userData = results[0]
     })
     console.log(userData[0])
     // var phoneNumber = {PhoneNumber: userData[0].PhoneNumber}
     // newData[i].PhoneNumber.push(phoneNumber)
     newData[i].PhoneNumber = userData[0].PhoneNumber;

}
console.log(newData)
return newData
}

function deleteC(data) {
  var newData = []
  for (i = 0; i < data.length; i++) {
    if (data[i].FoodStatus !== 'Complete' && data[i].FoodStatus !== 'Reject'){
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
  .filter('FoodStatus', '=', 'Complete')
   await globalVar.datastore.runQuery(query)
  .then((results) => {
    var tasks = results[0];
    data = results[0]
  });
  console.log(data[0])
 return data
}

module.exports.getHistoryOrderAdmin = async function () {
  var data;
  const kind = 'Order';
  const taskKey = globalVar.datastore.key([kind]);
  const query = globalVar.datastore.createQuery([kind])
  .filter('FoodStatus', '=', 'Complete')
   await globalVar.datastore.runQuery(query)
  .then((results) => {
    var tasks = results[0];
    data = results[0]
  });
  console.log(data[0])
 return data
}

module.exports.changeOrderStatus = async function (orderID, newStatus) {
  var data;
  const kind = 'Order';
  const taskKey = globalVar.datastore.key([kind]);
  const query = globalVar.datastore.createQuery([kind])
  .filter('OrderID', '=', orderID)
  await globalVar.datastore.runQuery(query)
 .then((results) => {
   var tasks = results[0];
   data = results[0]
 });
  var order = data[0]
  const id = parseInt(data[0][globalVar.datastore.KEY].id)
  const newTaskKey = globalVar.datastore.key([kind,id]);
  const entity = {
    key: newTaskKey,
    data:{
      FoodStatus: newStatus,
      Order: order.Order,
      OrderDescription: order.OrderDescription,
      OrderID: order.OrderID,
      UserID: order.UserID
    }
    };
  await globalVar.datastore.update(entity)
  .then((results) => {
    console.log(results[0], "Result from delete")
  });
  return 'Done'
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
