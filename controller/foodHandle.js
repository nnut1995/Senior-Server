const globalVar = require('../global')

module.exports.getAllFood = async function () {
  var data;
  const kind = 'Food';
  const taskKey = globalVar.datastore.key([kind]);
  const query = globalVar.datastore.createQuery([kind])
  .filter('type', '=', 'food')
   await globalVar.datastore.runQuery(query)
  .then((results) => {
    var tasks = results[0];
    data = results[0]
  });
 return data
}

module.exports.getAllDrink = async function () {
  var data;
  const kind = 'Food';
  const taskKey = globalVar.datastore.key([kind]);
  const query = globalVar.datastore.createQuery([kind])
  .filter('type', '=', 'drink')
   await globalVar.datastore.runQuery(query)
  .then((results) => {
    var tasks = results[0];
    data = results[0]
  });
 return data
}
