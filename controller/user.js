const globalVar = require('../global')

module.exports.register = function (username, password, type, phoneNumber, name) {
  const kind = 'User';
  const taskKey = globalVar.datastore.key([kind]);
  const task = {
    key: taskKey,
    data: {
      Username: username,
      Password: password,
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
    console.log(password, " xxx ", data[0].Password)
    if (password == data[0].Password){
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
  .filter('Type', '=', 'Student')
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
  .filter('Type', '=', 'Staff')
   await globalVar.datastore.runQuery(query)
  .then((results) => {
    var tasks = results[0];
    data = results[0]
  });
 return data
}
