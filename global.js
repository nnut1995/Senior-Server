exports.datastore = require('@google-cloud/datastore')({
  projectId: 'seniorproject-server',
  keyFilename: 'keyfile.json'
});
