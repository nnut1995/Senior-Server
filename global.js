exports.datastore = require('@google-cloud/datastore')({
  projectId: 'seniorproject-server',
  keyFilename: 'keyfile.json'
});

const Storage = require('@google-cloud/storage');
const projectId = 'seniorproject-server';
exports.storage  = new Storage({
  projectId: projectId,
  keyFilename: 'keyfile.json'
});
// exports.storage = require('@google-cloud/storage')({
//   projectId: 'seniorproject-server',
//   keyFilename: 'keyfile.json'
// });
