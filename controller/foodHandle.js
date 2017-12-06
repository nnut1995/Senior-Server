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

module.exports.addFood = async function (name, image, price, type) {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const foodID = date+'_'+time
  const kind = 'Food';
  const taskKey = globalVar.datastore.key([kind]);
  const task = {
    key: taskKey,
    data: {
      amountTaken: 1,
      id: foodID,
      image: image,
      name: name,
      price: price,
      type: type
    }
  };
  globalVar.datastore.save(task)
  .then(() => {
    console.log(`Saved `);
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
  return 'Success'
}

module.exports.deleteFood = async function (foodID) {
  try{
  var data;
  const kind = 'Food';
  const taskKey = globalVar.datastore.key([kind]);
  const query = globalVar.datastore.createQuery([kind])
  .filter('id', '=', foodID)
  await globalVar.datastore.runQuery(query)
 .then((results) => {
   var tasks = results[0];
   data = results[0]
 });
  const id = parseInt(data[0][globalVar.datastore.KEY].id)
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


module.exports.uploadFile = function (bucketName, filename, name, type, callback) {
  globalVar.storage
    .bucket(bucketName)
    .upload(filename, { public: true,destination: type + "/"+ name +".jpg"})
    .then(() => {
      callback("https://storage.googleapis.com/" + bucketName + "/" +  type + "/" + name + ".jpg")
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END storage_upload_file]

// }
}
