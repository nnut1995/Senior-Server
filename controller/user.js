const globalVar = require('../global')
var bcrypt = require('bcryptjs');

module.exports.register = async function (username, password, type, phoneNumber, name) {
  var data;
  const kind = 'User';
  const query = globalVar.datastore.createQuery([kind])
  .filter('Username', '=', username)
   await globalVar.datastore.runQuery(query)
  .then((results) => {
    data = results[0]
  })
  console.log(data)
  if (data.length == 0){
    var bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    const taskKey = globalVar.datastore.key([kind]);
    const task = {
      key: taskKey,
      data: {
        Username: username,
        Password: hash,
        Type: type,
        PhoneNumber: phoneNumber,
        Name: name
      }
    };
    globalVar.datastore.save(task)
    .then(() => {
      console.log(`Saved `);
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
    return "true"
}
else {
  return "false"
}
}

module.exports.login = async function (username, password) {
  status = 'false'
  try {
    var data;
    console.log('login')
    const kind = 'User';
    const taskKey = globalVar.datastore.key([kind]);
    const query = globalVar.datastore.createQuery([kind])
    .filter('Username', '=', username)
     await globalVar.datastore.runQuery(query)
    .then((results) => {
      data = results[0]
    })
    if (bcrypt.compareSync(password, data[0].Password)){
      status = {Type: data[0].Type}
    }
  } catch (e) {
      console.log(e)
}
  finally{
    return status
}
}

module.exports.getAllStudent = async function () {
  var data;
  const kind = 'User';
  const taskKey = globalVar.datastore.key([kind]);
  const query = globalVar.datastore.createQuery([kind])
  .filter('Type', '=', 'student')
   await globalVar.datastore.runQuery(query)
  .then((results) => {
    var tasks = results[0];
    data = results[0]
  });
 return data
}

module.exports.getAllStaff = async function () {
  var data;
  const kind = 'User';
  const taskKey = globalVar.datastore.key([kind]);
  const query = globalVar.datastore.createQuery([kind])
  .filter('Type', '=', 'staff')
   await globalVar.datastore.runQuery(query)
  .then((results) => {
    var tasks = results[0];
    data = results[0]
  });
 return data
}

module.exports.banUser = async function (username) {
  try{
  var data;
  const kind = 'User';
  const taskKey = globalVar.datastore.key([kind]);
  const query = globalVar.datastore.createQuery([kind])
  .filter('Username', '=', username)
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

module.exports.editUser = async function (username, name, phoneNumber, password, type) {
  var data;
  var bcrypt = require('bcryptjs');
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  const kind = 'User';
  const taskKey = globalVar.datastore.key([kind]);
  const query = globalVar.datastore.createQuery([kind])
  .filter('Username', '=', username)
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
      Username: username,
      Password: hash,
      Type: type,
      PhoneNumber: phoneNumber,
      Name: name,
    }
    };
  await globalVar.datastore.update(entity)
  .then((results) => {
    console.log(results[0], "Hi")
  });
  return 'Done'
}


module.exports.getUserInfo = async function (username) {
    var data;
    const kind = 'User';
    const taskKey = globalVar.datastore.key([kind]);
    const query = globalVar.datastore.createQuery([kind])
    .filter('Username', '=', username)
     await globalVar.datastore.runQuery(query)
    .then((results) => {
      data = results[0]
    })
    return data[0]
}
