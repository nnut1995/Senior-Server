const globalVar = require('../global')

module.exports.checkout = async function (state, order, specialOrder) {
  var today = new Date();
  const kind = 'Order';
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const orderID = state+'-'+date+time
  FoodStatus = 'Pending'
  const taskKey = globalVar.datastore.key([kind]);
  const task = {
    key: taskKey,
    data: {
      Order: order,
      OrderDescription: specialOrder,
      OrderID: orderID,
      UserID: state,
      FoodStatus: FoodStatus
    }
  };
  globalVar.datastore.save(task)
  return true
}
